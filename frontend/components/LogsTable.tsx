import React, { useContext, useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { ColDef } from "ag-grid-community";
import { useDateContext } from "@/contexts/DateContext";
import { getAlerts } from "@/lib/requestdata";

interface RowData {
  timestamp: string;
  triggered_by: string;
  rule_name: string;
  severity_type: string;
  country: string;
}

const TableComponent: React.FC = () => {
  const { date } = useDateContext();
  const [data, setData] = useState<RowData[]>([]);
  const columnDefs: ColDef[] = [
    { headerName: "Timestamp", field: "timestamp", width: 180 },
    { headerName: "Username", field: "triggered_by", width: 150 },
    { headerName: "Rule Name", field: "rule_name", width: 180 },
    { headerName: "Severity", field: "severity_type", width: 100 },
  ];

  useEffect(() => {
    async function fetchData() {
      const a = await getAlerts(date);
      setData(a);
    }
    fetchData();
  }, [date]);

  return (
    <div
      className="ag-theme-alpine-dark"
      style={{ height: 800, width: "100%" }}
    >
      <AgGridReact columnDefs={columnDefs} rowData={data} />
    </div>
  );
};

export default TableComponent;
