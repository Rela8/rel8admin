import { read, utils ,writeFileXLSX } from 'xlsx';
import ExcelJS from 'exceljs'


type exportExcelFileProp ={
    headers:string[];
    rows:{value:string,title:string}[][],
    fileName?:string;
}
export const exportExcelFile  =  ({rows=[],headers=[],fileName='generated file'}:exportExcelFileProp)=>{
    const workbook = new ExcelJS.Workbook();
           const sheet = workbook.addWorksheet("My Sheet");
        //    sheet.properties.defaultRowHeight = 80;
        //    sheet.columns = [
        //      {
        //        header: "Id",
        //        key: "id",
        //        width: 15,
        //      },
        //      { header: "Title", key: "title", width: 15 },
        //    ];

           sheet.columns =headers.map((head,index)=>({'header':head,key:head,width:15}))
        //    headers.ma
        rows.map((row,index)=>{
            // let titles =row.map((title,index)=>({
            //     `${title}`:
            // })) 
             let arragedObject =row.map((d,index)=>{
                let data:any = {}
                 data[`${d.title}`]=d.value
                return data
             })
             console.log(arragedObject)
            sheet.addRow(Object.assign({},...arragedObject))
        })
           workbook.xlsx.writeBuffer().then(data=>{
             const blob = new Blob([data],{
                 type:'application/vmd.openxmlformats-officedocument.spreadsheet.sheet',
             });
             const url = window.URL.createObjectURL(blob)
             const a =document.createElement('a')
             a.href=url
             a.download=`${fileName}.xlsx`
             a.click()
             window.URL.revokeObjectURL(url)
           })
}

