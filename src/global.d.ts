// Extenda a classe jsPDF manualmente, caso a abordagem anterior não funcione
import jsPDF from "jspdf";
import "jspdf-autotable";

declare module "jspdf-autotable" {
  interface jsPDF {
    lastAutoTable?: {
      finalY: number;
    };
  }
}
