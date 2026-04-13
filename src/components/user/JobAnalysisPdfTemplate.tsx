import { forwardRef } from "react";

interface JobAnalysisPdfData {
  fullName: string;
  positionTitle: string;
  officeDivision: string;
  sectionUnit: string;
  alternatePosition: string;
  jobPurpose: string;
  mainDuties: string;
  duties: { task: string; frequency: string }[];
  skills: { skill: string; level: string }[];
  toolsEquipment: string;
  challenges: string;
  additionalComments: string;
}

const freqCols = ["Daily", "Weekly", "Monthly", "Quarterly", "As Instructed"];
const levelCols = ["Basic", "Intermediate", "Advanced", "Superior"];

const JobAnalysisPdfTemplate = forwardRef<HTMLDivElement, { data: JobAnalysisPdfData }>(({ data }, ref) => {
  const cellStyle: React.CSSProperties = { border: "1px solid black", padding: "4px 5px", verticalAlign: "top", fontSize: "10pt" };
  const headerStyle: React.CSSProperties = { ...cellStyle, backgroundColor: "#A6C9EC", textAlign: "center", fontWeight: "bold" };
  const subHeaderStyle: React.CSSProperties = { ...cellStyle, backgroundColor: "#DAE9F8", textAlign: "center", fontWeight: "bold" };
  const grayStyle: React.CSSProperties = { ...cellStyle, backgroundColor: "#F2F2F2", fontSize: "9pt" };

  return (
    <div ref={ref} id="job-analysis-pdf-content" className="pdf-template-container">
      <div style={{
        fontFamily: "'Book Antiqua', 'Times New Roman', serif",
        fontSize: "11pt",
        color: "black",
        background: "white",
        width: "750px",
        margin: "0 auto",
        padding: "20px",
        boxSizing: "border-box",
      }}>
        {/* Header */}
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <tbody>
            <tr>
              <td style={{ ...cellStyle, borderBottom: "none" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "15px", padding: "5px" }}>
                  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Department_of_Transportation_%28Philippines%29.svg/330px-Department_of_Transportation_%28Philippines%29.svg.png" width="70" alt="DOTr" crossOrigin="anonymous" />
                  <img src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Bagong_Pilipinas_logo.png" width="80" alt="Bagong Pilipinas" crossOrigin="anonymous" />
                  <div>
                    <p style={{ margin: 0, lineHeight: 1.2 }}>Republic of the Philippines</p>
                    <p style={{ margin: 0, lineHeight: 1.2, fontWeight: "bold" }}>DEPARTMENT OF TRANSPORTATION</p>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>

        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <tbody>
            <tr><td style={headerStyle}><p style={{ fontSize: "14pt", margin: 0, fontWeight: "bold" }}>JOB ANALYSIS FORM</p></td></tr>
          </tbody>
        </table>

        {/* Personal Info */}
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <tbody>
            {[
              ["Full Name:", data.fullName],
              ["Position Title:", data.positionTitle],
              ["Office/Service/Division:", data.officeDivision],
              ["Section/Project/Unit:", data.sectionUnit],
              ["Alternate Position:", data.alternatePosition],
            ].map(([label, val]) => (
              <tr key={label}>
                <td style={{ ...cellStyle, width: "25%", fontWeight: "bold" }}>{label}</td>
                <td style={{ ...cellStyle, fontWeight: "bold" }}>{val}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Job Purpose */}
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <tbody>
            <tr><td style={subHeaderStyle}><strong>JOB PURPOSE</strong><br /><em style={{ fontSize: "9pt" }}>(Brief Description)</em></td></tr>
            <tr><td style={{ ...cellStyle, minHeight: "60px", whiteSpace: "pre-wrap" }}>{data.jobPurpose}</td></tr>
          </tbody>
        </table>

        {/* Main Duties */}
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <tbody>
            <tr><td style={subHeaderStyle}><strong>MAIN DUTIES AND RESPONSIBILITIES</strong></td></tr>
            <tr><td style={{ ...cellStyle, minHeight: "100px", whiteSpace: "pre-wrap" }}>{data.mainDuties}</td></tr>
          </tbody>
        </table>

        {/* Secondary Duties */}
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <tbody>
            <tr><td colSpan={7} style={subHeaderStyle}><strong>SECONDARY DUTIES & RESPONSIBILITIES</strong></td></tr>
            <tr>
              <td rowSpan={2} style={{ ...cellStyle, textAlign: "center", fontWeight: "bold", width: "5%" }}>NO.</td>
              <td rowSpan={2} style={{ ...cellStyle, textAlign: "center", fontWeight: "bold", width: "45%" }}>TASKS</td>
              <td colSpan={5} style={{ ...cellStyle, textAlign: "center", fontWeight: "bold" }}>FREQUENCY OF TASKS</td>
            </tr>
            <tr>
              {freqCols.map((f) => (
                <td key={f} style={{ ...cellStyle, textAlign: "center", fontWeight: "bold", fontSize: "8pt" }}>{f}</td>
              ))}
            </tr>
            {data.duties.filter(d => d.task.trim()).map((d, i) => (
              <tr key={i}>
                <td style={{ ...cellStyle, textAlign: "center" }}>{i + 1}</td>
                <td style={cellStyle}>{d.task}</td>
                {freqCols.map((f) => (
                  <td key={f} style={{ ...cellStyle, textAlign: "center", fontWeight: "bold" }}>
                    {d.frequency === f || (f === "As Instructed" && d.frequency === "As Instructed") ? "X" : ""}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>

        {/* Skills */}
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <tbody>
            <tr><td colSpan={6} style={subHeaderStyle}><strong>REQUIRED COMPETENCIES</strong></td></tr>
            <tr>
              <td rowSpan={2} style={{ ...cellStyle, textAlign: "center", fontWeight: "bold", width: "5%" }}>NO.</td>
              <td rowSpan={2} style={{ ...cellStyle, textAlign: "center", fontWeight: "bold", width: "45%" }}>SKILLS</td>
              <td colSpan={4} style={{ ...cellStyle, textAlign: "center", fontWeight: "bold" }}>PROFICIENCY LEVEL</td>
            </tr>
            <tr>
              {levelCols.map((l) => (
                <td key={l} style={{ ...cellStyle, textAlign: "center", fontWeight: "bold", fontSize: "8pt" }}>{l.toUpperCase()}</td>
              ))}
            </tr>
            {data.skills.filter(s => s.skill.trim()).map((s, i) => (
              <tr key={i}>
                <td style={{ ...cellStyle, textAlign: "center" }}>{i + 1}</td>
                <td style={cellStyle}>{s.skill}</td>
                {levelCols.map((l) => (
                  <td key={l} style={{ ...cellStyle, textAlign: "center", fontWeight: "bold" }}>
                    {s.level === l ? "X" : ""}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>

        {/* Tools */}
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <tbody>
            <tr><td style={subHeaderStyle}><strong>TOOLS AND EQUIPMENT</strong></td></tr>
            <tr><td style={{ ...cellStyle, minHeight: "40px", whiteSpace: "pre-wrap" }}>{data.toolsEquipment}</td></tr>
          </tbody>
        </table>

        {/* Challenges */}
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <tbody>
            <tr><td style={subHeaderStyle}><strong>CHALLENGES AND CRITICAL ISSUES</strong></td></tr>
            <tr><td style={{ ...cellStyle, minHeight: "60px", whiteSpace: "pre-wrap" }}>{data.challenges}</td></tr>
          </tbody>
        </table>

        {/* Comments */}
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <tbody>
            <tr><td style={subHeaderStyle}><strong>ADDITIONAL COMMENTS</strong></td></tr>
            <tr><td style={{ ...cellStyle, minHeight: "60px", whiteSpace: "pre-wrap" }}>{data.additionalComments}</td></tr>
          </tbody>
        </table>

        {/* Certification */}
        <table style={{ width: "100%", borderCollapse: "collapse", pageBreakInside: "avoid" }}>
          <tbody>
            <tr>
              <td style={{ ...cellStyle, padding: "10px" }}>
                <p style={{ textAlign: "justify", marginBottom: "20px" }}>
                  I hereby certify that all information and statements provided herewith are accurate.
                </p>
                <p>Signature: ______________________</p>
                <p style={{ marginTop: "20px" }}>Date: {new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
});

JobAnalysisPdfTemplate.displayName = "JobAnalysisPdfTemplate";
export default JobAnalysisPdfTemplate;
