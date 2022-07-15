import { RequestData } from "../../common/interfaces/request.interface";

export async function post(data: RequestData) {
  try {
    const rawResponse = await fetch("http://localhost:8000/api/yeetldata/", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const content = await rawResponse.json();
  } catch {
    console.log("Bad");
  }

  return {
    connectedRecords: [
      {
        patientName: "Alexander Pearson",
        date: "07/15/22",
        orderLink: "https://labs.rupahealth.com/admin/order",
      },
      {
        patientName: "Alexander Pearson",
        date: "07/15/22",
        orderLink: "https://labs.rupahealth.com/admin/order",
      },
      {
        patientName: "Alexander Pearson",
        date: "07/15/22",
        orderLink: "https://labs.rupahealth.com/admin/order",
      },
      {
        patientName: "Alexander Pearson",
        date: "07/15/22",
        orderLink: "https://labs.rupahealth.com/admin/order",
      },
      {
        patientName: "Alexander Pearson",
        date: "07/15/22",
        orderLink: "https://labs.rupahealth.com/admin/order",
      },
    ],
    unmatchedRecords: [
      {
        patientName: "Alexander Pearson",
        date: "07/15/22",
      },
      {
        patientName: "Alexander Pearson",
        date: "07/15/22",
      },
      {
        patientName: "Alexander Pearson",
        date: "07/15/22",
      },
      {
        patientName: "Alexander Pearson",
        date: "07/15/22",
      },
      {
        patientName: "Alexander Pearson",
        date: "07/15/22",
      },
      {
        patientName: "Alexander Pearson",
        date: "07/15/22",
      },
      {
        patientName: "Alexander Pearson",
        date: "07/15/22",
      },
    ],
  };
}
