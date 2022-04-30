import React from 'react'
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';


function ExportXLXS({ csvData, fileName }) {
    const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const fileExtension = '.xlsx';

    const exportToCSV = (csvData, fileName) => {
        const ws = XLSX.utils.json_to_sheet(csvData);
        const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
        const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        const data = new Blob([excelBuffer], { type: fileType });
        FileSaver.saveAs(data, fileName + fileExtension);
    }

    return (
        <button className='header-button' onClick={(e) => exportToCSV(csvData,fileName)}>
            <i className="far fa-cloud-download"></i>
            <span className='button-text'>Kết xuất</span>
        </button>
    )
}

export default ExportXLXS