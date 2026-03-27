"use client";

import { IoCloseOutline, IoPrintOutline } from "react-icons/io5";
import InvoiceView from "./invoice-view";

interface InvoiceModalProps {
  reservation: any;
  isOpen: boolean;
  onClose: () => void;
}

export default function InvoiceModal({ reservation, isOpen, onClose }: InvoiceModalProps) {
  if (!isOpen || !reservation) return null;

  const handlePrint = () => {
    const invoiceEl = document.getElementById("invoice-bill");
    if (!invoiceEl) return;

    const invoiceHTML = invoiceEl.innerHTML;
    const printWindow = window.open("", "_blank", "width=800,height=900");
    if (!printWindow) {
      alert("Popup diblokir browser. Mohon izinkan popup untuk halaman ini lalu coba lagi.");
      return;
    }

    printWindow.document.write(`
      <!DOCTYPE html>
      <html lang="id">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Invoice EbKost - #${reservation.id.slice(0, 10).toUpperCase()}</title>
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;900&display=swap');

            *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

            body {
              font-family: 'Inter', sans-serif;
              background: white;
              padding: 40px;
              color: #111;
              -webkit-print-color-adjust: exact;
              print-color-adjust: exact;
            }

            /* ── Layout ── */
            .invoice-wrapper {
              background: white;
              border: 2px solid #f3f4f6;
              border-radius: 16px;
              padding: 40px;
              position: relative;
              overflow: hidden;
            }

            /* ── Watermark ── */
            .watermark {
              position: absolute;
              top: 0; right: 0;
              padding: 40px;
              opacity: 0.03;
              user-select: none;
              transform: rotate(-12deg);
              pointer-events: none;
            }
            .watermark h1 { font-size: 96px; font-weight: 900; }

            /* ── Flex helpers ── */
            .flex { display: flex; }
            .flex-col { flex-direction: column; }
            .items-start { align-items: flex-start; }
            .items-center { align-items: center; }
            .justify-between { justify-content: space-between; }
            .justify-center { justify-content: center; }
            .gap-1\\.5 { gap: 6px; }
            .gap-3 { gap: 12px; }
            .gap-4 { gap: 16px; }
            .text-right { text-align: right; }
            .text-center { text-align: center; }
            .relative { position: relative; }
            .overflow-hidden { overflow: hidden; }

            /* ── Grid ── */
            .grid { display: grid; }
            .grid-cols-2 { grid-template-columns: 1fr 1fr; }

            /* ── Spacing ── */
            .mb-1 { margin-bottom: 4px; }
            .mb-2 { margin-bottom: 8px; }
            .mb-3 { margin-bottom: 12px; }
            .mb-4 { margin-bottom: 16px; }
            .mb-10 { margin-bottom: 40px; }
            .mt-8 { margin-top: 32px; }
            .my-4 { margin-top: 16px; margin-bottom: 16px; }
            .pb-8 { padding-bottom: 32px; }
            .pt-8 { padding-top: 32px; }
            .p-5 { padding: 20px; }

            /* ── Borders ── */
            .border-b-2 { border-bottom: 2px solid; }
            .border-t-2 { border-top: 2px solid; }
            .border-dashed { border-style: dashed; }
            .border-gray-100 { border-color: #f3f4f6; }
            .border-gray-200 { border-color: #e5e7eb; }

            /* ── Text ── */
            .text-orange-500 { color: #f97316; }
            .text-orange-600 { color: #ea580c; }
            .text-green-700 { color: #15803d; }
            .text-gray-900 { color: #111827; }
            .text-gray-500 { color: #6b7280; }
            .text-gray-400 { color: #9ca3af; }
            .text-gray-200 { color: #e5e7eb; }
            .text-white { color: #fff; }

            .font-medium { font-weight: 500; }
            .font-bold { font-weight: 700; }
            .font-black { font-weight: 900; }
            .italic { font-style: italic; }

            .text-\\[10px\\] { font-size: 10px; }
            .text-\\[9px\\] { font-size: 9px; }
            .text-xs { font-size: 12px; }
            .text-sm { font-size: 14px; }
            .text-xl { font-size: 20px; }
            .text-2xl { font-size: 24px; }
            .text-9xl { font-size: 128px; }

            .tracking-tighter { letter-spacing: -0.05em; }
            .tracking-widest { letter-spacing: 0.1em; }
            .uppercase { text-transform: uppercase; }
            .leading-tight { line-height: 1.25; }
            .leading-relaxed { line-height: 1.625; }

            /* ── Backgrounds ── */
            .bg-white { background: white; }
            .bg-green-100 { background: #dcfce7; }
            .bg-gray-50 { background: #f9fafb; }
            .bg-gray-400 { background: #9ca3af; }

            /* ── Badges ── */
            .rounded-full { border-radius: 9999px; }
            .rounded-xl { border-radius: 12px; }
            .rounded-lg { border-radius: 8px; }

            /* ── Badge helper ── */
            .badge {
              display: inline-flex;
              align-items: center;
              gap: 6px;
              background: #dcfce7;
              color: #15803d;
              border: 1px solid #bbf7d0;
              padding: 6px 12px;
              border-radius: 9999px;
              font-size: 9px;
              font-weight: 900;
              text-transform: uppercase;
              letter-spacing: 0.1em;
            }

            /* ── Divider ── */
            .divider {
              height: 1px;
              background: #e5e7eb;
              border-top: 1px dashed #e5e7eb;
              width: 100%;
              margin: 16px 0;
            }

            /* ── Image placeholder ── */
            .room-img-wrapper {
              width: 48px;
              height: 48px;
              border-radius: 8px;
              overflow: hidden;
              border: 2px solid white;
              box-shadow: 0 1px 3px rgba(0,0,0,0.1);
              flex-shrink: 0;
            }
            .room-img-wrapper img {
              width: 100%;
              height: 100%;
              object-fit: cover;
            }

            /* ── Stamp ── */
            .stamp-wrapper {
              margin-top: 32px;
              display: flex;
              justify-content: center;
              opacity: 0.05;
              filter: grayscale(1);
              transform: scale(0.9);
            }
            .stamp {
              width: 96px;
              height: 96px;
              border: 8px solid #9ca3af;
              border-radius: 9999px;
              display: flex;
              align-items: center;
              justify-content: center;
              transform: rotate(-12deg);
            }
            .stamp span { font-weight: 900; font-size: 20px; }

            /* ── Print ── */
            @media print {
              body { padding: 20px; }
            }
          </style>
        </head>
        <body>
          <div class="invoice-wrapper">
            ${invoiceEl.outerHTML}
          </div>
        </body>
      </html>
    `);

    printWindow.document.close();
    printWindow.focus();

    // Tunggu gambar & font selesai load sebelum print
    printWindow.onload = () => {
      setTimeout(() => {
        printWindow.print();
        printWindow.close();
      }, 500);
    };
  };

  return (
    <div id="invoice-root" className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-white w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl shadow-2xl relative animate-in zoom-in duration-300">
        
        {/* Header Modal */}
        <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-md px-8 py-5 border-b border-gray-100 flex justify-between items-center rounded-t-3xl">
           <h3 className="font-black text-gray-900 uppercase text-xs tracking-widest">Digital Invoice Preview</h3>
           <button 
              onClick={onClose}
              className="size-10 bg-gray-50 text-gray-400 hover:bg-red-50 hover:text-red-500 rounded-full flex items-center justify-center transition-all active:scale-95"
           >
              <IoCloseOutline size={24} />
           </button>
        </div>

        {/* Content */}
        <div className="p-8">
           <InvoiceView reservation={reservation} />
           
           <div className="mt-8 flex gap-4">
              <button 
                onClick={handlePrint}
                className="flex-1 bg-gray-900 text-white py-4 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-black transition-all active:scale-95 shadow-lg shadow-gray-200"
              >
                 <IoPrintOutline size={20} />
                 Cetak / Download PDF
              </button>
              <button 
                onClick={onClose}
                className="flex-1 bg-gray-50 text-gray-500 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-gray-100 transition-all active:scale-95 border border-gray-100"
              >
                 Tutup
              </button>
           </div>
        </div>

      </div>
      
      {/* Click outside to close */}
      <div 
        className="absolute inset-0 -z-10" 
        onClick={onClose}
      />
    </div>
  );
}
