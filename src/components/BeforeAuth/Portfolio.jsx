import { useMemo, useState } from "react";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import useUserAuth from "./hooks/useAuth";
import Loader from "./Loader";
import LoaderData from "./LoaderData";
import resumeToPortfolio from "./assets/Resumstoportfoilo.png";

const GENERATOR_URL = "https://prewell-backend-2.onrender.com/resumes/generate-website";

const getFileContent = (file) => {
  if (typeof file === "string") return file;
  return file?.content || file?.code || file?.data || "";
};

const getFileName = (file, fallback) => {
  if (typeof file === "string") return fallback;
  return file?.name || file?.filename || file?.path || fallback;
};

const normalizePortfolio = (data) => {
  if (!data) return null;

  if (typeof data === "string") {
    return {
      html: data,
      css: "",
      js: "",
      files: [{ name: "index.html", content: data }],
      raw: data,
    };
  }

  const files = Array.isArray(data.files)
    ? data.files
    : Array.isArray(data.projectFiles)
      ? data.projectFiles
      : [];

  const htmlFile = files.find((file) =>
    getFileName(file, "").toLowerCase().endsWith(".html")
  );
  const cssFile = files.find((file) =>
    getFileName(file, "").toLowerCase().endsWith(".css")
  );
  const jsFile = files.find((file) =>
    getFileName(file, "").toLowerCase().endsWith(".js")
  );

  const html =
    data.html ||
    data.indexHtml ||
    data.preview ||
    data.portfolio ||
    data.website ||
    data.code?.html ||
    getFileContent(htmlFile);

  const css = data.css || data.code?.css || getFileContent(cssFile);
  const js = data.js || data.javascript || data.code?.js || getFileContent(jsFile);

  const normalizedFiles = files.length
    ? files.map((file, index) => ({
        name: getFileName(file, `file-${index + 1}.txt`),
        content: getFileContent(file),
      }))
    : [
        html && { name: "index.html", content: html },
        css && { name: "style.css", content: css },
        js && { name: "script.js", content: js },
      ].filter(Boolean);

  return {
    html,
    css,
    js,
    files: normalizedFiles,
    raw: data,
  };
};

const buildPreviewDocument = ({ html = "", css = "", js = "" }) => {
  if (!html) return "";

  const hasFullDocument = /<html[\s>]/i.test(html);

  if (hasFullDocument) {
    const withStyles = css
      ? html.replace("</head>", `<style>${css}</style></head>`)
      : html;

    return js
      ? withStyles.replace("</body>", `<script>${js}</script></body>`)
      : withStyles;
  }

  return `<!doctype html>
<html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <style>${css}</style>
  </head>
  <body>
    ${html}
    <script>${js}</script>
  </body>
</html>`;
};

export const Portfolio = () => {
  const isAuth = useUserAuth();
  const [loading, setLoading] = useState(false);
  const [portfolioData, setPortfolioData] = useState(null);
  const [uploadError, setUploadError] = useState("");

  const normalizedPortfolio = useMemo(
    () => normalizePortfolio(portfolioData),
    [portfolioData]
  );

  const previewDocument = useMemo(
    () =>
      normalizedPortfolio
        ? buildPreviewDocument(normalizedPortfolio)
        : "",
    [normalizedPortfolio]
  );

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    event.target.value = "";

    if (!file) return;

    if (file.type !== "application/pdf") {
      setUploadError("Only PDF resumes are allowed.");
      return;
    }

    try {
      setLoading(true);
      setUploadError("");
      setPortfolioData(null);

      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch(GENERATOR_URL, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Portfolio generation failed.");
      }

      const contentType = response.headers.get("content-type") || "";
      const data = contentType.includes("application/json")
        ? await response.json()
        : await response.text();

      setPortfolioData(data);
    } catch (error) {
      console.error("Upload failed:", error);
      setUploadError("Portfolio generation failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async () => {
    if (!normalizedPortfolio) return;

    const zip = new JSZip();
    const files = normalizedPortfolio.files.length
      ? normalizedPortfolio.files
      : [{ name: "index.html", content: previewDocument }];

    files.forEach((file) => {
      zip.file(file.name, file.content || "");
    });

    if (!files.some((file) => file.name.toLowerCase().endsWith(".html"))) {
      zip.file("index.html", previewDocument);
    }

    const blob = await zip.generateAsync({ type: "blob" });
    saveAs(blob, "folify-portfolio.zip");
  };

  if (isAuth === null) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600">
        Loading...
      </div>
    );
  }

  if (!isAuth) return null;

  return (
    <>
      <div className="bg-[#FAF4F3] py-20 px-6 lg:px-16 flex flex-col lg:flex-row items-center justify-between gap-12">
        <div className="max-w-xl text-center lg:text-left">
          <h3 className="text-sm text-red-500 font-semibold uppercase mb-2">
            Resume Portfolio Builder
          </h3>
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-6">
            Build a website from your resume file.
          </h1>
          <p className="text-lg text-gray-700 mb-8">
            Want your resume to shine and turn heads? Folify transforms your
            resume into a stunning portfolio website, showcases your skills with
            style, and gives you downloadable code built to boost your personal
            brand and get you hired faster.
          </p>

          <ul className="text-left mb-8 space-y-2 text-gray-800">
            <li>- Converts your resume into a portfolio website</li>
            <li>- Gives you clean, downloadable source code</li>
            <li>- Creates a live preview after generation</li>
          </ul>

          <div className="w-full max-w-md p-6 rounded-xl shadow-lg flex flex-col items-center gap-6 bg-white/50">
            {loading ? (
              <Loader />
            ) : (
              <div className="text-center">
                <p className="text-gray-700 font-semibold">
                  Upload your resume (PDF)
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  Your portfolio preview will appear below after generation.
                </p>
                {uploadError && (
                  <p className="text-sm text-red-600 mt-3">{uploadError}</p>
                )}
              </div>
            )}

            <form onSubmit={(e) => e.preventDefault()}>
              <label className="cursor-pointer bg-red-500 text-white px-6 py-3 rounded-md shadow-md hover:bg-red-600 transition duration-300 inline-block">
                {loading ? "Generating..." : "Upload PDF"}
                <input
                  disabled={loading}
                  type="file"
                  accept=".pdf"
                  className="hidden"
                  onChange={handleFileUpload}
                />
              </label>
            </form>
          </div>
        </div>

        <div className="w-full lg:w-1/2 flex justify-center">
          <img
            src={resumeToPortfolio}
            alt="Resume to portfolio website builder"
            className="max-w-full h-auto"
          />
        </div>
      </div>

      {loading ? (
        <LoaderData />
      ) : (
        <section className="bg-[#FAF4F3] px-4 pb-20">
          <div className="max-w-6xl mx-auto">
            {normalizedPortfolio ? (
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 p-6 border-b border-gray-100">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">
                      Portfolio Preview
                    </h2>
                    <p className="text-gray-600 mt-1">
                      Review the generated website and download the source code.
                    </p>
                  </div>

                  <button
                    onClick={handleDownload}
                    className="bg-red-500 text-white px-6 py-3 rounded-md shadow-md hover:bg-red-600 transition duration-300"
                  >
                    Download Code
                  </button>
                </div>

                {previewDocument ? (
                  <iframe
                    title="Generated portfolio preview"
                    srcDoc={previewDocument}
                    className="w-full h-170 bg-white"
                    sandbox="allow-scripts"
                  />
                ) : (
                  <pre className="m-6 p-4 rounded-lg bg-gray-950 text-gray-100 overflow-auto text-sm">
                    {JSON.stringify(normalizedPortfolio.raw, null, 2)}
                  </pre>
                )}
              </div>
            ) : (
              <div className="text-center rounded-2xl border border-dashed border-red-200 bg-white/50 p-10">
                <h2 className="text-2xl font-bold text-gray-900">
                  No portfolio generated yet
                </h2>
                <p className="text-gray-600 mt-2">
                  Upload a PDF resume above to generate and preview your
                  portfolio website.
                </p>
              </div>
            )}
          </div>
        </section>
      )}
    </>
  );
};
