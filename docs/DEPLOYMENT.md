# Publishing HanLingo

Public address: https://hanlingo.pairup.world/

GitHub Pages serves the root of the `gh-pages` artifact branch in `uhonglim/HanLingo`. Aliyun DNS has one CNAME: host `hanlingo`, target `uhonglim.github.io`, TTL 10 minutes. Keep the custom domain configured in GitHub Pages and HTTPS enforcement enabled once its certificate is issued.

From a clean, committed source checkout, run `npm run deploy`. This runs the tests and production build, then publishes the generated files in a temporary checkout of `gh-pages`. It does not merge or alter the source branch. Push the source commit to GitHub before publishing it.

The build generates directory entry points for published routes and legacy aliases, a sitemap of canonical routes, `robots.txt`, and `release.json` containing the source commit. `public/CNAME` preserves the domain and `.nojekyll` disables Jekyll processing. Unknown URLs retain a 404 status and show the application's recovery page.

After publishing, check the GitHub Pages build/deployment result, authoritative and public DNS, and HTTPS without bypassing certificate validation. Confirm that `/release.json` matches the intended source commit. Open the homepage and a nested lesson directly in a browser; check navigation, images, and word search. A successful push alone does not confirm a live release.
