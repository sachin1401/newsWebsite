const newsContainer = document.getElementById("newsdetails");
    const apiKey = "b958ba6bcead4c1b8f45d7f5d64b4e96";
    const apiUrl = `https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=${apiKey}`;

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        // Check if the response contains the articles data
        if (data.articles && Array.isArray(data.articles)) {
          let tableData = data.articles.map((article) => {
            return `
              <div class="news-card">
                ${article.urlToImage ? `<div class="news-image-container">
                                          <img class="news-image" src="${article.urlToImage}" alt="News Image"/>
                                        </div>`
                                    : ``
                }
                <div class="news-content">
                  <h3 class="news-author alert alert-primary">${article.title}</h3>
                  <p class="news-text">${article.content}</p>
                </div>
              </div>
            `;
          });

          newsContainer.innerHTML = tableData.join(" ");
        } else {
          // If the response does not contain the articles data, display an error message
          newsContainer.innerHTML = "<p>Error: No news articles found.</p>";
        }
      })
      .catch((error) => {
        // Handle any errors that occur during the request
        console.error('Error:', error);
        newsContainer.innerHTML = "<p>Error: Failed to fetch news articles. Please try again later.</p>";
      });