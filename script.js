document.getElementById('fetch-button').addEventListener('click', fetchData);

function fetchData() {
    const owner = 'PLMCentricTeam'; // Ganti dengan username pemilik repositori
    const repo = 'ValidationStyle'; // Ganti dengan nama repositori
    const filePath = 'Master Data/data.json'; // Path dari file yang ingin diambil
    // const filterValue = '440326-005'; // Nilai untuk melakukan filter
    // const filterValue = document.getElementById('searchInput').value;
    const filterValue = document.getElementById('searchInput').value.trim();
    const URLData = `https://api.github.com/repos/${owner}/${repo}/contents/${filePath}`;
    fetch(URLData)
        .then(response => response.json())
        .then(data => {
            // Decode base64-encoded content dari data.content
            const decodedContent = atob(data.content);
            const jsonData = JSON.parse(decodedContent);
            // Lakukan filter jika ada nilai filter yang diinputkan
            let filteredData = jsonData;
            if (filterValue) {
                filteredData = jsonData.filter(item => item.Style_Name === filterValue);
            }
            // Menampilkan data yang telah difilter di dalam elemen HTML
            const contentDiv = document.getElementById('content');
            const tableBody = document.getElementById('data-table').getElementsByTagName('tbody')[0];
            tableBody.innerHTML = '';
            filteredData.forEach(item => {
                const tr = document.createElement('tr');
                const row = tableBody.insertRow();
                displayDataStylename();
                displayDataFabricArticle();
                displayDataBAGArticleNumber();
                displayDataContent();
                displayDataCountConst();
                displayDataWidthWeight();
                displayDataCountryOfOrigin();
                // displayDataStylename();

                function displayDataStylename() {
                    const cellStyleName = row.insertCell(0);
                    cellStyleName.textContent = item.Style_Name;
                }

                function displayDataFabricArticle() {
                    const cellStyleName = row.insertCell(1);
                    cellStyleName.textContent = item.Article_Number;
                }

                function displayDataBAGArticleNumber() {
                    const cellStyleName = row.insertCell(2);
                    cellStyleName.textContent = item.BAG_Article_Number;
                }

                function displayDataContent() {
                    const cellStyleName = row.insertCell(3);
                    cellStyleName.textContent = item.Composition;
                }

                function displayDataCountConst() {
                    const cellStyleName = row.insertCell(4);
                    cellStyleName.textContent = item.Construction;
                }

                function displayDataWidthWeight() {
                    const cellStyleName = row.insertCell(5);
                    cellStyleName.textContent = item.Cuttabl_Width + " " + item.Width_Unit + ", " + item.Weight+ " " + item.Weight_Unit;
                }

                function displayDataCountryOfOrigin() {
                    const cellStyleName = row.insertCell(6);
                    cellStyleName.textContent = item.Country_of_Origin;
                }
            //     const itemDiv = document.createElement('div');
            //     itemDiv.classList.add('data-item');
            //     itemDiv.textContent = `Name: ${item.Style_Name}, Age: ${item.Article_Number}, Email: ${item.Style_Name}`;
            //     contentDiv.appendChild(itemDiv);
            });

            // Jika tidak ada data yang sesuai dengan filter
            if (filteredData.length === 0) {
                const noDataDiv = document.createElement('div');
                noDataDiv.textContent = 'No data found.';
                contentDiv.appendChild(noDataDiv);
            }
        })
        .catch(error => {
            console.error('Error fetching file content:', error);
        });
}
