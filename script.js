console.log("Script is Start!");

let audioElement = new Audio("songs/Playlist1/Channa ve.mp3");
// // Variables

let cardContainer = document.querySelector(".cardContainer");
let card = document.querySelectorAll(".card");
let currentAlbumContainer = document.querySelector(".currentAlbumContainer");

let NavHamburger = document.querySelector(".hamburgerDiv");
let listBox = document.querySelector(".listBox");
let home = document.querySelector(".icon");
let searchIcon = document.querySelector(".search");
let searchInput = document.querySelector("#input");
let logo = document.querySelector("#logo");
let AlbumHamburger = document.querySelector(".leftBoxHamburger");
let leftBox = document.querySelector(".leftBox");
let close = document.querySelector("#close");
let previous = document.querySelector("#pre");
let play = document.querySelector("#play");
let next = document.querySelector("#nex");
let volIcon = document.querySelector("#volume");
let volBar = document.querySelector("#volBar");
let seekBar = document.querySelector("#seekBar");
let songDiv = document.querySelectorAll(".song");












// Function to format time
function formatTime(time) {
  let minutes = Math.floor(time / 60);
  let seconds = Math.floor(time % 60);
  return `0${minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
}

document.addEventListener("DOMContentLoaded", async () => {
  const cardContainer = document.querySelector(".cardContainer");
  const albumContainer = document.querySelector(".albumContainer");
  const currentAlbumContainer = document.querySelector(
    ".currentAlbumContainer"
  );

  try {
    const response = await fetch("fetch_playlists.php");
    const playlists = await response.json();

    cardContainer.innerHTML = "";
    albumContainer.innerHTML = "";

    playlists.forEach((playlist) => {
      // update Card Container
      let card = document.createElement("div");
      card.classList.add("card", "flex");

      card.innerHTML = `
        <img src="${playlist.cover}" alt="" class="cardCover" />
        <div class="cardInfo flex">
            <h2>${playlist.album}</h2>
            <p>${playlist.artist}</p>
        </div>
        <div class="cardBtn flex">
            <img src="play.svg" alt="Play" />
        </div>
      `;

      // update album Container
      let album = document.createElement("div");
      album.classList.add("albumDiv", "flex");

      album.innerHTML = `
        <div class="flex albumInfo">
                            <img src="${playlist.cover}" alt="" class="cover" />
                            <div class="flex albumTxt">
                                <h4>${playlist.album}</h4>
                                <p>${playlist.artist}</p>
                            </div>
                        </div>
                        <div class="play flex">
                            <img src="play.svg" alt="Play" />
                        </div>
      `;

      cardContainer.appendChild(card);
      albumContainer.appendChild(album);
    });

    // Function to Fetch Songs from Playlist Folder
    function fetchAndDisplaySongs(playlistName, artist, cover) {
      fetch(`fetch_songs.php?playlist=${playlistName}`)
        .then((response) => response.json())
        .then((songs) => {
          console.log("Songs in Playlist:", songs);

          let songContainer = document.querySelector(".albumSongs");
          songContainer.innerHTML = "";
          let mp3Songs = songs.filter((song) => song.endsWith(".mp3"));
          let playlist = mp3Songs;
          mp3Songs.forEach((song, index) => {
            let songItem = document.createElement("div");
            songItem.classList.add("song", "flex");
            let songName = song.replace(/\.mp3$/, "");

            songItem.innerHTML = `
              <div class="flex curentInfo">
                <p>${index + 1}</p>
                <div>
                  <h2>${songName}</h2>
                  <p>${artist}</p>
                </div>
              </div>
              <div class="songPlay flex">
                <img src="play.svg" alt="Play">
              </div>
            `;

            let currentSongIndex = 0; //
            // Function to play the next song
            function playNextSong() {
              if (playlist.length === 0) return;
          
              currentSongIndex = (currentSongIndex + 1) % playlist.length;
              
              let nextSong = playlist[currentSongIndex];
              let songName = nextSong.replace(/\.mp3$/, "");
          
              audioElement.src = `Songs/${playlistName}/${nextSong}`;
              audioElement.play();
              play.src = "pause.svg";   
          
              // Update song info
              document.querySelector(".songInfo").innerHTML = `
                  <img src="${cover}" alt="Song" class="currentSongImg" />
                  <div class="info flex">
                      <h2>${songName}</h2>
                      <p>${artist}</p>
                  </div>
              `;
          
              console.log(`Now playing: ${songName}`);
          }
          


            function playPreviousSong() {
              if (playlist.length === 0) return;

              currentSongIndex = (currentSongIndex - 1) % playlist.length;
              let nextSong = playlist[currentSongIndex];
              let songName = nextSong.replace(/\.mp3$/, "");

              audioElement.src = `Songs/${playlistName}/${nextSong}`;
              audioElement.play();
              play.src = "pause.svg";

              // Update Song info
              document.querySelector(".songInfo").innerHTML = `
                     <img src="${cover}" alt="Song" class="currentSongImg" />
                     <div class="info flex">
                     <h2>${songName}</h2>
                     <p>${artist}</p>
                     </div>
                     `;

               console.log(`Now playing: ${songName}`);
            }

            // Add event listener to the next button
            let next = document.querySelector("#nex");
            next.addEventListener("click", playNextSong);

            // Add event listener to the next button
            let previous = document.querySelector("#pre");
            previous.addEventListener("click", playPreviousSong);

            // loop with music
            audioElement.addEventListener("ended", () => {
              playNextSong(); 
          });

            songItem.addEventListener("click", (e) => {
              audioElement.src = `Songs/${playlistName}/${song}`;
              audioElement.play();
              play.src = "pause.svg";
              console.log(audioElement.src)
              let playingSong = audioElement.src

              
// Lyrics FUnction


              console.log(e.currentTarget.querySelector("h2").textContent);
              // Update Song info in the Playbox
              document.querySelector(".songInfo").innerHTML = `
                     <img src="${cover}" alt="Song" class="currentSongImg" />
                        <div class="info flex">
                           <h2>${songName}</h2>
                           <p>${artist}</p>
                     </div>
                     `;
            });

            // Append to container
            songContainer.appendChild(songItem);
          });
        })
        .catch((error) => console.error("Error fetching songs:", error));
    }

    // Add event listener to each card
    document.querySelectorAll(".card").forEach((card, index) => {
      card.addEventListener("click", () => {
        let img = card.querySelector(".cardCover").src;
        let h2 = card.querySelector(".cardInfo h2").textContent;
        let p = card.querySelector(".cardInfo p").textContent;

        console.log(h2, p, img);

        cardContainer.classList.add("hidden");
        currentAlbumContainer.classList.remove("hidden");

        currentAlbumContainer.querySelector(".albumHeader").innerHTML = `
          <img src="${img}" alt="" class="albumcover">
          <div class="albumInfo">
            <h2>${h2}</h2>
            <p>${p}</p>
          </div>
        `;

        const playlistName = playlists[index].name;
        fetchAndDisplaySongs(playlistName, p, img);
      });
    });

    // Add event listener to each Album
    document.querySelectorAll(".albumDiv").forEach((card, index) => {
      card.addEventListener("click", () => {
        let img = card.querySelector(".cover").src;
        let h2 = card.querySelector(".albumTxt h4").textContent;
        let p = card.querySelector(".albumTxt p").textContent;

        console.log(h2, p, img);

        cardContainer.classList.add("hidden");
        currentAlbumContainer.classList.remove("hidden");

        currentAlbumContainer.querySelector(".albumHeader").innerHTML = `
              <img src="${img}" alt="" class="albumcover">
              <div class="albumInfo">
                <h2>${h2}</h2>
                <p>${p}</p>
              </div>
            `;

        const playlistName = playlists[index].name;
        fetchAndDisplaySongs(playlistName, p, img);
      });
    });
  } catch (error) {
    console.error("Error fetching playlists:", error);
  }
});


// console.log(PlayingSong);


// SHow Home Page
home.addEventListener("click", () => {
  cardContainer.classList.remove("hidden");
  currentAlbumContainer.classList.add("hidden");
});

let headerIcon = document.querySelector(".headerIcon");
headerIcon.addEventListener("click", () => {
  cardContainer.classList.remove("hidden");
  currentAlbumContainer.classList.add("hidden");
});

// SeekBar Update
audioElement.addEventListener("timeupdate", () => {
  // console.log(e)
  let progress = parseInt(
    (audioElement.currentTime / audioElement.duration) * 100
  );
  seekBar.value = progress;

  document.getElementById("currentTime").textContent = formatTime(
    audioElement.currentTime
  );
  document.getElementById("durationTime").textContent = formatTime(
    audioElement.duration
  );
});

seekBar.addEventListener("change", () => {
  audioElement.currentTime = (seekBar.value * audioElement.duration) / 100;
  console.log(audioElement.currentTime);
});

// volume
volIcon.addEventListener("click", () => {
  if (volIcon.src.includes("volume.svg")) {
    volIcon.src = "mute.svg";
    volBar.value = "0";
    audioElement.volume = 0;
  } else {
    volIcon.src = "volume.svg";
    volBar.value = "50";
    audioElement.volume = 0.5;
  }
});
volBar.addEventListener("change", () => {
  audioElement.volume = volBar.value / 100;
  if (volBar.value == "0") {
    volIcon.src = "mute.svg";
  } else {
    volIcon.src = "volume.svg";
  }
  console.log(volBar.value);
});

NavHamburger.addEventListener("click", () => {
  listBox.classList.toggle("hidden");
});

AlbumHamburger.addEventListener("click", () => {
  leftBox.style.left = "1px";
});
close.addEventListener("click", () => {
  leftBox.style.left = "-520px";
});
// Search Icon
searchIcon.addEventListener("click", () => {
  if (searchInput.style.display === "none") {
    searchInput.style.display = "flex";
    logo.style.display = "none";
    searchIcon.style.width = "170px";
    console.log("Search is Opening");
  } else if (window.innerWidth < 740) {
    searchIcon.style.width = "27px";
    searchInput.style.display = "none";
    logo.style.display = "block";
    console.log("Search is Closing");
  }
});

// Play & pause
play.addEventListener("click", () => {
  if (play.src.includes("play1.svg")) {
    play.src = "pause.svg";
    audioElement.play();
  } else {
    play.src = "play1.svg";
    audioElement.pause();
  }
});

// Lyrics Box
let lyricsBox = document.querySelector(".lyricsBox");
let rightBox = document.querySelector(".rightBox");
let lyricsIcon = document.querySelector("#lyrics");
lyricsIcon.addEventListener("click", () => {
  lyricsBox.classList.toggle("hidden");
  if (window.innerWidth < 740) {
    if (rightBox.style.display === "none") {
      rightBox.style.display = "block";
    } else {
      rightBox.style.display = "none";
    }
  }

});
