import axios, { AxiosError } from "axios";

type FetchProps = {
    url: string;
};

export default function UseFetch({ url }: FetchProps) {
    return new Promise((resolve, reject) => {
        axios.get(url)
            .then((response) => {
                resolve(response.data);
            })
            .catch((error: AxiosError) => {
                if (error.response) {
                    reject(`Request failed with status ${error.response.status}`);
                } else if (error.request) {
                    // Erro de requisição (sem resposta do servidor)
                    reject("No response received from the server");
                } else {
                    // Erro ao configurar a solicitação
                    reject(`Error setting up the request: ${error.message}`);
                }
            });
    });
}