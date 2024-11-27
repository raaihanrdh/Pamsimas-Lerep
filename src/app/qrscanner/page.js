import QrScanModal from "../components/modal/qrScanModal";

export default function Home() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold">QR Code Scanner</h1>
      <QrScanModal />
    </div>
  );
}
