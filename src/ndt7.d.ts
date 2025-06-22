// types/ndt7.d.ts
declare module "@m-lab/ndt7" {
  export interface NDT7Config {
    userAcceptedDataPolicy: boolean
    downloadworkerfile?: string
    uploadworkerfile?: string
  }

  export interface TCPInfo {
    ElapsedTime: number
    BytesReceived: number
    BytesSent?: number
  }

  export interface MeasurementData {
    ElapsedTime?: number
    MeanClientMbps?: number
    TCPInfo?: TCPInfo
  }

  export interface DownloadMeasurementEvent {
    Data?: MeasurementData
  }

  export interface UploadMeasurementEvent {
    Data?: MeasurementData
  }

  export interface DownloadCompleteEvent {
    LastClientMeasurement?: {
      MeanClientMbps?: number
    }
  }

  export interface UploadCompleteEvent {
    LastServerMeasurement?: {
      TCPInfo?: TCPInfo
    }
  }

  export interface NDT7Callbacks {
    downloadMeasurement?: (data: DownloadMeasurementEvent) => void
    downloadComplete?: (data: DownloadCompleteEvent) => void
    uploadMeasurement?: (data: UploadMeasurementEvent) => void
    uploadComplete?: (data: UploadCompleteEvent) => void
    error?: (error: Error) => void
  }

  // Different possible export patterns
  export function test(config: NDT7Config, callbacks: NDT7Callbacks): void

  export const ndt7: {
    test: (config: NDT7Config, callbacks: NDT7Callbacks) => void
  }

  // Default export possibility
  const _default: {
    test: (config: NDT7Config, callbacks: NDT7Callbacks) => void
  }
  export default _default
}
