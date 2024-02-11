const BASE_URL = "https://api.github.com/repos";

async function getRepositoryContents(owner, repo) {
  try {
    const response = await fetch(`${BASE_URL}/${owner}/${repo}/contents`);
    return await response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

async function getPackageJsonContent(owner, repo, path) {
  try {
    const response = await fetch(
      `${BASE_URL}/${owner}/${repo}/contents/${path}`
    );
    return await response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

async function getReposText(searchText) {
  try {
    const response = await fetch(
      `https://api.github.com/search/repositories?q=${searchText}`
    );
    const data = await response.json();
    // Handle the data, which contains information about the repositories
    const repositories = data.items;
    const newData = repositories.map((item) => {
      const result = {
        id: item?.id,
        name: item?.name,
        url: item?.html_url,
        forks: item?.forks_count,
        stars: item?.stargazers_count,
        owner: item?.owner?.login,
        isImported: false,
      };
      return result;
    });
    return newData;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

export { getPackageJsonContent, getRepositoryContents, getReposText };
