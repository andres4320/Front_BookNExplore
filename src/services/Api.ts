export class Api {
    static baseUrl = "http://localhost:8000/api/"

    static async post<T>(url: string, data: any): Promise<any> {
        console.log("Datos enviados:", data);
        const response = await fetch(`${Api.baseUrl}${url}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        const dataResponse = await response.json();
        return {
            statusCode: response.status,
            data: dataResponse,
        };
    }

}