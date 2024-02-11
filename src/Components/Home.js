import React from "react";
import { getRepositoryContents, getPackageJsonContent } from "../utils/api";
const Home = ({ repos, setImportedRepos, setRepos, setPackages, packages }) => {
  /*
  function to fetch the root directory
   content and if packages.json exists then r
   ead it's dependencies
   */
  async function importRepository(owner, repo, newRepo) {
    try {
      const contents = await getRepositoryContents(owner, repo);
      const packageJsonFile = contents.find(
        (file) => file.name === "package.json"
      );

      if (packageJsonFile) {
        const packageJsonContent = await getPackageJsonContent(
          owner,
          repo,
          packageJsonFile.path
        );
        const decodedContent = atob(packageJsonContent.content);
        const packageJson = JSON.parse(decodedContent);

        const dependencies = packageJson.dependencies || {};
        const newPackages = [...packages];
        /*updating the count of imported r
        epo packages if package already exist 
        else add that as a new package
        */
        for (const dependecy in dependencies) {
          const myPackage = newPackages.find((pack) => pack.key === dependecy);
          if (myPackage) {
            myPackage.count += 1;
          } else {
            newPackages.push({ key: dependecy, count: 1 });
          }
        }
        setPackages(newPackages);
        setImportedRepos((repos) => [...repos, newRepo]);
        repos.forEach((repo) => {
          if (repo.id === newRepo) {
            repo.isImported = true;
          }
        });
        setRepos(repos);
      } else {
        // show alert if root directory doen't have package.json file
        alert("Package.json not found in the root directory");
      }
    } catch (error) {
      console.error("Error:", error.message || error);
    }
  }

  return (
    <div className="home">
      {!repos.length && <div className="home-content">No repos available</div>}
      {repos.map((repo) => (
        <div className="card m-3" id={repo.id}>
          <div className="card-header">{repo.name}</div>
          <div className="card-body">
            <p className="card-text">Forks: {repo.forks}</p>
            <p className="card-text">Stars: {repo.stars}</p>
            {repo?.isImported ? (
              <p className="alert alert-success">Repo imported successfully</p>
            ) : (
              <button
                className="btn btn-primary"
                onClick={() => importRepository(repo.owner, repo.name, repo.id)}
              >
                Import
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Home;
