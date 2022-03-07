We're really glad you're reading this, because we need volunteer developers to help this project come to fruition. 👏

## Instructions

These steps will guide you through contributing to this project:

- Fork the repo
- Clone it and install dependencies

		git clone https://github.com/YOUR-USERNAME/typescript-library-starter
		npm install

Keep in mind that after running `npm install` the git repo is reset. So a good way to cope with this is to have a copy of the folder to push the changes, and the other to try them.

Make and commit your changes. Make sure the commands npm run build and npm run test:prod are working.

Finally send a [GitHub Pull Request](https://github.com/alexjoverm/typescript-library-starter/compare?expand=1) with a clear list of what you've done (read more [about pull requests](https://help.github.com/articles/about-pull-requests/)). Make sure all of your commits are atomic (one feature per commit).

## Release

This repository uses Github Actions to manage releases. To create a release, merge your approved PR into the master branch. This will then create a release PR which needs to be approved before it can be merged. This PR will include the bunped version and update the changelog. Once merged, Github Actions will automatically build, test, and publish the release as well as deploy the documentation [gh-page](https://amplience.github.io/dc-extensions-sdk/).