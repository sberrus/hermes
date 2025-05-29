/*instrumentation.ts*/
import * as opentelemetry from "@opentelemetry/sdk-node";
import { getNodeAutoInstrumentations } from "@opentelemetry/auto-instrumentations-node";
import { OTLPTraceExporter } from "@opentelemetry/exporter-trace-otlp-proto";
import { OTLPMetricExporter } from "@opentelemetry/exporter-metrics-otlp-proto";
import { PeriodicExportingMetricReader } from "@opentelemetry/sdk-metrics";
import dotenv from "dotenv";
dotenv.config();
const TELEMETRY_COLLECTOR_ENDPOINT = process.env.TELEMETRY_COLLECTOR_ENDPOINT;
// const dynatraceToken = process.env.DYNATRACE_TOKEN;

const sdk = new opentelemetry.NodeSDK({
  traceExporter: new OTLPTraceExporter({
    // optional - default url is http://localhost:4318/v1/traces
    url: `${TELEMETRY_COLLECTOR_ENDPOINT}/v1/traces`,
    // // optional - collection of custom headers to be sent with each request, empty by default
    // headers: {
    //   Authorization: `Api-Token ${dynatraceToken}`,
    // },
  }),
  metricReader: new PeriodicExportingMetricReader({
    exporter: new OTLPMetricExporter({
      url: `${TELEMETRY_COLLECTOR_ENDPOINT}/v1/metrics`, // url is optional and can be omitted - default is http://localhost:4318/v1/metrics
      // headers: {
      //   Authorization: `Api-Token ${dynatraceToken}`,
      // }, // an optional object containing custom headers to be sent with each request
    }),
  }),
  instrumentations: [
    // Esta configuración omite los logs que devuelve de error de dyna UNSUPPORTED_METRIC_TYPE_MONOTONIC_CUMULATIVE_SUM
    getNodeAutoInstrumentations({
      "@opentelemetry/instrumentation-http": {
        enabled: true,
        requestHook: (span) => {},
      },
      "@opentelemetry/instrumentation-express": {
        enabled: true,
      },
    }),
  ],
});

try {
  sdk.start();
  console.log("Telemetría conectada satisfactoriamente");
} catch (error) {
  console.log("Error:", error);
}
