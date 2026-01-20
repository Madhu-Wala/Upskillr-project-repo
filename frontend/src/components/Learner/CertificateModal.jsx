import React, { useRef } from 'react';
import { X, Download } from 'lucide-react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const CertificateModal = ({ course, userName = "Student", isOpen, onClose }) => {
  const certificateRef = useRef();

  // Debug: log course data
  React.useEffect(() => {
    if (isOpen && course) {
      console.log('Certificate Modal - Course Data:', {
        title: course?.title,
        instructor: course?.instructor,
        id: course?.id
      });
    }
  }, [isOpen, course]);

  const downloadCertificate = async () => {
    try {
      const element = certificateRef.current;
      
      // Add a small delay to ensure rendering
      await new Promise(resolve => setTimeout(resolve, 100));

      // Capture the certificate as an image with high quality
      const canvas = await html2canvas(element, {
        scale: 3,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#fef3c7',
        logging: false,
        windowHeight: element.scrollHeight,
        windowWidth: element.scrollWidth,
      });

      // Create PDF with A4 landscape orientation
      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'px',
        format: [canvas.width, canvas.height],
      });

      const imgData = canvas.toDataURL('image/png');
      pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
      pdf.save(`${course?.title || 'Certificate'}.pdf`);
    } catch (error) {
      console.error('Error generating certificate:', error);
      alert('Error generating certificate. Please try again.');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-5xl max-h-[95vh] flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-blue-600 p-6 flex justify-between items-center rounded-t-3xl flex-shrink-0">
          <h2 className="text-2xl font-bold text-white">Your Certificate of Completion</h2>
          <button
            onClick={onClose}
            className="text-white hover:bg-white hover:bg-opacity-20 p-2 rounded-full transition"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Certificate Preview - Scrollable */}
        <div className="flex-1 overflow-y-auto p-8 bg-gray-50 flex justify-center items-start">
          <div
            ref={certificateRef}
            style={{
              width: '100%',
              maxWidth: '900px',
              backgroundColor: '#fef3c7',
              border: '8px solid #d97706',
              borderRadius: '8px',
              flexShrink: 0,
            }}
            className="relative flex flex-col items-center justify-center p-12 text-center"
          >
            {/* Decorative Corners */}
            <div className="absolute top-4 left-4 w-6 h-6 border-t-4 border-l-4 border-orange-700"></div>
            <div className="absolute top-4 right-4 w-6 h-6 border-t-4 border-r-4 border-orange-700"></div>
            <div className="absolute bottom-4 left-4 w-6 h-6 border-b-4 border-l-4 border-orange-700"></div>
            <div className="absolute bottom-4 right-4 w-6 h-6 border-b-4 border-r-4 border-orange-700"></div>

            {/* Content Container */}
            <div className="flex flex-col items-center justify-center gap-6 w-full">
              {/* Star Badge */}
              <div className="w-24 h-24 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center shadow-lg flex-shrink-0">
                <svg className="w-16 h-16 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>

              {/* Title */}
              <div>
                <p style={{ color: '#b45309', fontSize: '18px', fontWeight: '600', letterSpacing: '3px' }} className="uppercase tracking-widest">
                  Certificate of Completion
                </p>
              </div>

              {/* Brown Bar */}
              <div style={{ backgroundColor: '#92400e', height: '4px', width: '70%' }}></div>

              {/* Divider with Dot */}
              <div className="flex items-center justify-center gap-4 w-full">
                <div style={{ backgroundColor: '#b45309', height: '2px', flex: 1 }}></div>
                <div style={{ backgroundColor: '#f59e0b', width: '8px', height: '8px', borderRadius: '50%' }}></div>
                <div style={{ backgroundColor: '#b45309', height: '2px', flex: 1 }}></div>
              </div>

              {/* Certificate Text */}
              <div className="space-y-4 w-full">
                <p style={{ color: '#4b5563', fontSize: '18px' }}>This is to certify that</p>

                {/* Student Name */}
                <div style={{ borderBottom: '2px solid #d97706', paddingBottom: '8px' }}>
                  <p style={{ color: '#78350f', fontSize: '48px', fontWeight: '700' }}>
                    {userName || 'Student'}
                  </p>
                </div>

                {/* Completion Text */}
                <p style={{ color: '#4b5563', fontSize: '16px' }}>has successfully completed the course</p>

                {/* Course Title */}
                <p style={{ color: '#92400e', fontSize: '32px', fontStyle: 'italic', fontWeight: '700' }}>
                  {course?.title || 'Course'}
                </p>

                {/* Final Statement */}
                <p style={{ color: '#4b5563', fontSize: '15px' }}>
                  with demonstrated skill, dedication, and outstanding commitment to learning excellence.
                </p>
              </div>

              {/* Bottom Information Section */}
              <div className="w-full pt-6" style={{ borderTop: '1px solid rgba(180, 83, 9, 0.3)' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px' }}>
                  {/* Instructor Name */}
                  <div style={{ textAlign: 'left' }}>
                    <p style={{ color: '#6b7280', fontSize: '11px', fontWeight: '600', letterSpacing: '1.5px', marginBottom: '4px' }} className="uppercase">
                      Course Instructor
                    </p>
                    <p style={{ color: '#78350f', fontSize: '14px', fontWeight: '700' }}>
                      {(() => {
                        const instructor = course?.instructor;
                        console.log('Instructor value:', instructor, 'Type:', typeof instructor);
                        return instructor && instructor !== 'undefined' && instructor !== 'Upskillr Team' ? instructor : 'Upskillr Team';
                      })()}
                    </p>
                  </div>

                  {/* Download Date */}
                  <div style={{ textAlign: 'right' }}>
                    <p style={{ color: '#6b7280', fontSize: '11px', fontWeight: '600', letterSpacing: '1.5px', marginBottom: '4px' }} className="uppercase">
                      Certificate Date
                    </p>
                    <p style={{ color: '#78350f', fontSize: '14px', fontWeight: '700' }}>
                      {new Date().toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer - Always Visible */}
        <div className="bg-white border-t border-gray-200 p-6 rounded-b-3xl flex gap-4 justify-end flex-shrink-0">
          <button
            onClick={onClose}
            className="px-6 py-3 text-gray-700 bg-gray-100 rounded-xl font-semibold hover:bg-gray-200 transition"
          >
            Close
          </button>
          <button
            onClick={downloadCertificate}
            className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-xl font-semibold hover:shadow-lg transition flex items-center gap-2"
          >
            <Download className="w-5 h-5" />
            Download Certificate
          </button>
        </div>
      </div>
    </div>
  );
};

export default CertificateModal;
