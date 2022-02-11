export const mainAPI = {
    fetchData() {
        return fetch('./apps.json', {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
            .then(response => {
                return response.json();
            })
            .then(data => {
                return data;
            });
    }
}