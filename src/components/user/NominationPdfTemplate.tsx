import { forwardRef } from "react";

interface NominationPdfData {
  title: string;
  dateCourse: string;
  dateFiling: string;
  venue: string;
  competency: string;
  name: string;
  idNum: string;
  email: string;
  office: string;
  position: string;
  supervisor: string;
  dateHired: string;
  empStatus: string;
  sg: string;
  service: string;
  contact: string;
  gender: string;
  oic: string;
  justification: string;
}

interface NominationPdfTemplateProps {
  data: NominationPdfData;
}

const NominationPdfTemplate = forwardRef<HTMLDivElement, NominationPdfTemplateProps>(({ data }, ref) => {
  return (
    <div ref={ref} id="nomination-pdf-content" className="pdf-template-container">
      <div style={{
        fontFamily: "'Book Antiqua', Georgia, serif",
        fontSize: "10pt",
        lineHeight: 1.4,
        backgroundColor: "white",
        color: "black",
        width: "750px",
        padding: "20px 30px",
        boxSizing: "border-box",
        margin: "0 auto",
      }}>
        <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: "12px" }}>
          <tbody>
            <tr>
              <td rowSpan={3} style={{ border: "1px solid #000", textAlign: "center", width: "160px", verticalAlign: "middle" }}>
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Department_of_Transportation_%28Philippines%29.svg/330px-Department_of_Transportation_%28Philippines%29.svg.png" alt="DOTr" style={{ width: "60px", margin: "0 4px" }} crossOrigin="anonymous" />
                <img src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Bagong_Pilipinas_logo.png" alt="Bagong Pilipinas" style={{ width: "60px", margin: "0 4px" }} crossOrigin="anonymous" />
              </td>
              <td colSpan={3} style={{ border: "1px solid #000", padding: "10px", textAlign: "left" }}>
                <span style={{ fontSize: "13pt", display: "block" }}>Republic of the Philippines</span>
                <strong style={{ fontSize: "13pt" }}>Department of Transportation</strong>
              </td>
            </tr>
            <tr>
              <td style={{ border: "1px solid #000", padding: "5px 6px" }}>Document No:<br />DOTr-HRDD-Forms-001</td>
              <td style={{ border: "1px solid #000", padding: "5px 6px" }}>Rev. No.: 005</td>
              <td style={{ border: "1px solid #000", padding: "5px 6px" }}>Effective Date: _______ 2025</td>
            </tr>
            <tr>
              <td colSpan={3} style={{ border: "1px solid #000", fontWeight: "bold", textAlign: "center", fontSize: "11pt", padding: "5px 6px" }}>
                LEARNING AND DEVELOPMENT NOMINATION FORM
              </td>
            </tr>
          </tbody>
        </table>

        <div style={{ marginBottom: "10px", fontSize: "9pt" }}>
          <strong>INSTRUCTIONS:</strong> This form is used in nominating an employee to attend a Learning & Development Intervention (LDI). Fill out this form and attach the signed and scanned copy in the Online Nomination Form.
        </div>

        <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: "12px" }}>
          <tbody>
            <tr><td colSpan={3} style={{ border: "1px solid #000", padding: "5px 6px", backgroundColor: "#DDD9C3", fontWeight: "bold" }}>I. Training/Program Information</td></tr>
            <tr>
              <td colSpan={3} style={{ border: "1px solid #000", padding: "5px 6px" }}>
                <strong>Title of Training/Course:</strong> {data.title}
              </td>
            </tr>
            <tr>
              <td style={{ border: "1px solid #000", padding: "5px 6px", width: "50%" }}>
                <strong>Date of Training/Course:</strong> {data.dateCourse}
              </td>
              <td colSpan={2} style={{ border: "1px solid #000", padding: "5px 6px" }}>
                <strong>Date of Filing:</strong> {data.dateFiling}
              </td>
            </tr>
            <tr>
              <td style={{ border: "1px solid #000", padding: "5px 6px" }}>
                <strong>Type of Competency:</strong><br />
                [{data.competency === "core" ? "X" : " "}] Core<br />
                [{data.competency === "leadership" ? "X" : " "}] Leadership<br />
                [{data.competency === "functional" ? "X" : " "}] Functional
              </td>
              <td colSpan={2} style={{ border: "1px solid #000", padding: "5px 6px" }}>
                <strong>Venue:</strong> {data.venue}
              </td>
            </tr>

            <tr><td colSpan={3} style={{ border: "1px solid #000", padding: "5px 6px", backgroundColor: "#DDD9C3", fontWeight: "bold" }}>II. Participant's Information</td></tr>
            <tr>
              <td colSpan={2} style={{ border: "1px solid #000", padding: "5px 6px" }}>
                <strong>Name:</strong> {data.name}<br />
                <strong>ID Number:</strong> {data.idNum}<br />
                <strong>Email:</strong> {data.email}
              </td>
              <td style={{ border: "1px solid #000", padding: "5px 6px" }}>
                <strong>Office/Unit Head:</strong> {data.office}
              </td>
            </tr>
            <tr>
              <td colSpan={2} style={{ border: "1px solid #000", padding: "5px 6px" }}>
                <strong>Position Title:</strong> {data.position}
              </td>
              <td style={{ border: "1px solid #000", padding: "5px 6px" }}>
                <strong>Immediate Supervisor:</strong> {data.supervisor}
              </td>
            </tr>
            <tr>
              <td colSpan={2} style={{ border: "1px solid #000", padding: "5px 6px" }}>
                <strong>Date Hired:</strong> {data.dateHired}<br />
                <strong>Status:</strong> {data.empStatus}<br />
                <strong>Salary Grade:</strong> {data.sg}<br />
                <strong>Service Years:</strong> {data.service}<br />
                <strong>Contact:</strong> {data.contact}<br />
                <strong>Gender:</strong> {data.gender}
              </td>
              <td style={{ border: "1px solid #000", padding: "5px 6px" }}>
                <strong>OIC (SG 24+):</strong> {data.oic}
              </td>
            </tr>

            <tr><td colSpan={3} style={{ border: "1px solid #000", padding: "5px 6px", backgroundColor: "#DDD9C3", fontWeight: "bold" }}>IV. Justification</td></tr>
            <tr>
              <td colSpan={3} style={{ border: "1px solid #000", padding: "5px 6px", minHeight: "50px", textAlign: "justify" }}>
                {data.justification}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
});

NominationPdfTemplate.displayName = "NominationPdfTemplate";
export default NominationPdfTemplate;
export type { NominationPdfData };
