async function downloadMedia() {
  const url = document.getElementById("urlInput").value.trim();
  if (!url) {
    alert("Please paste an Instagram link.");
    return;
  }

  const formData = new FormData();
  formData.append("q", url);

  const response = await fetch("https://saveig.app/api/ajaxSearch", {
    method: "POST",
    body: formData
  });

  const result = await response.json();

  if (result && result.medias && result.medias.length > 0) {
    const media = result.medias[0];
    const video = document.getElementById("video");
    const image = document.getElementById("image");
    const downloadBtn = document.getElementById("downloadBtn");

    if (media.url.includes(".mp4")) {
      video.src = media.url;
      video.style.display = "block";
      image.style.display = "none";
    } else {
      image.src = media.url;
      image.style.display = "block";
      video.style.display = "none";
    }

    downloadBtn.href = media.url;
    document.getElementById("result").style.display = "block";
  } else {
    alert("Failed to fetch media. Make sure the link is public and valid.");
  }
}
