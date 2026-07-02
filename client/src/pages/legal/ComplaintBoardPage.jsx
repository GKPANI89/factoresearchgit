import React from 'react';
import { complaintBoardData, sebiRiskDisclosure } from '../../data/legalData';

const ComplaintBoardPage = () => {
    const renderTable = (tableData, caption) => (
        <div className="legal-table-wrapper" role="region" aria-label={caption}>
            <table className="legal-table">
                <caption>{caption}</caption>
                <thead>
                    <tr>
                        {tableData.headers.map((header) => (
                            <th key={header} scope="col">
                                {header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {tableData.rows.map((row, rowIndex) => (
                        <tr key={`${row.join('-')}-${rowIndex}`}>
                            {row[0] === '' && row[1]?.toLowerCase() === 'total' ? (
                                <>
                                    <th scope="row" colSpan={2}>
                                        {row[1]}
                                    </th>
                                    {row.slice(2).map((cell, cellIndex) => (
                                        <td key={`${cell}-${cellIndex + 2}`}>{cell}</td>
                                    ))}
                                </>
                            ) : (
                                row.map((cell, cellIndex) =>
                                    cellIndex === 0 ? (
                                        <th key={`${cell}-${cellIndex}`} scope="row">
                                            {cell}
                                        </th>
                                    ) : (
                                        <td key={`${cell}-${cellIndex}`}>{cell}</td>
                                    )
                                )
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );

    return (
        <div className="inner-page legal-page">
            <section className="page-header legal-header">
                <div className="container">
                    <div className="page-header-card glass-card">
                        <span className="page-header-eyebrow">Legal</span>
                        <h1 className="page-header-title">{complaintBoardData.title}</h1>
                        <p className="page-header-subtitle">Data for the month ending: {complaintBoardData.monthEnding}</p>
                    </div>
                </div>
            </section>

            <section className="section-padding legal-section">
                <div className="container legal-container">
                    <article className="glass-card legal-card legal-download-card">
                        <h2>Download</h2>
                        <p>Download the complaint board PDF file.</p>
                        <a
                            className="btn-primary legal-download-btn"
                            href="/documents/Complaint%20Board.pdf?v=june-2026"
                            download="Complaint Board.pdf"
                        >
                            Download Complaint Board Data (PDF) - June 2026
                        </a>
                    </article>

                    <article className="glass-card legal-card">
                        <h2>Data for the Month Ending: {complaintBoardData.monthEnding}</h2>
                        {renderTable(
                            complaintBoardData.sourceTable,
                            `Statement of investor complaints for the month ending ${complaintBoardData.monthEnding}`
                        )}
                    </article>

                    <article className="glass-card legal-card">
                        <h2>Trend of Monthly Disposal of Complaints</h2>
                        {renderTable(complaintBoardData.monthlyTrendTable, 'Trend of monthly disposal of complaints')}
                    </article>

                    <article className="glass-card legal-card">
                        <h2>Trend of Annual Disposal of Complaints</h2>
                        {renderTable(complaintBoardData.annualTrendTable, 'Trend of annual disposal of complaints')}
                    </article>

                    <article className="glass-card legal-card legal-risk-card">
                        <h2>SEBI Investment Risk Disclosure</h2>
                        <p>{sebiRiskDisclosure}</p>
                    </article>
                </div>
            </section>
        </div>
    );
};

export default ComplaintBoardPage;
