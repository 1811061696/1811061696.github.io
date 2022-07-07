/* 
    1. render song
    2. Scroll top
    3.  play/ pause/ Seek
    4. Cd rotate
    5. next/ prew
    6. random
    7. next/ repeat/ when ended
    8. Active song
    9. Srcoll active song into view
    10. play song when click
*/

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);


const   PLAYER_STORAGE_KEY = 'F8_PLAYER'; // tạo content



const heading = $('header h2');  // lấy ra thẻ hiển thị tên bài hát 
const cdThumb = $('.cd-thumb'); // lấy ra thẻ hiển thị ảnh bài hát
const audio = $('#audio'); // lấy thẻ hiển thị phát bài hát
const cd = $('.cd');  // lấy ra thẻ cd
const playBtn = $('.btn-toggle-play') // lấy ra nút btn play
const play = $('.player')// lấy ra thẻ play
const progress = $('#progress');// lấy ra thẻ input hiển thị tiến độ bài hát 
const prevtBtn = $('.btn-prev'); // lấy ra nút quay lại bài trước
const nextBtn = $('.btn-next');// lấy ra nút phát bài kế tiếp
const randomBtn = $('.btn-random') // lấy ra thẻ chứa nút random
const repeatBtb = $('.btn-repeat') // lấy ra thẻ chứa nút repeat
const playlist = $('.playlist')


const app = {
    currentIndex: 0,
    isPlaying: false, // mặc định bài hát lúc đâu k chạy
    isRandom: false, // mặc định để nút random là false(" khhong kích hoạt")
    isRepeat: false, // mặc địch nút repeat là fale('Không được kích hoạt')
    // config: JSON.parse(localStorage.getItem(PLAYER_STORAGE_KEY)) || {},
                    // lấy vào một chuỗi string dạng json đã được lưu trong biến PLAYER_STORAGE_KEY sau đó chuyển nó sang chuỗi html
                    // nếu trong biến PLAYER_STORAGE_KEY không có giá trị nào được lưu thì lấy vào một object trống
    songs: [
        {
            name: "Ghì chặt tay anh",
            singer: "Kevin Khánh",
            path: "./assets/music/song1.mp3",
            image: "./assets/img/song1.jpg"
        },
        {
            name: "beutifulliar in white",
            singer: "Shane Filan",
            path: "./assets/music/Beautiful.mp3",
            image:
                "./assets/img/song2.jpg"
        },
        {
            name: "Anh Mơ",
            singer: "Anh Khang",
            path:
                "./assets/music/Anh-Mo-Anh-Khang.mp3",
            image: "./assets/img/song3.jpg"
        },
        {
            name: "Anh sai rồi",
            singer: "Sơn Tùng-MTP",
            path: "./assets/music/Anh-Sai-Roi-Son-Tung-M-TP.mp3",
            image:
                "./assets/img/song4.jpg"
        },
        {
            name: "Bài hát tặng em",
            singer: "Hoàng Tôn",
            path: "./assets/music/Bai-Hat-Tang-Em-Hoang-Ton.mp3",
            image:
                "./assets/img/song5.jpg"
        },
        {
            name: "Hạnh phúc cuối cùng",
            singer: "Trương Việt Thái",
            path:
                "./assets/music/Hanh-Phuc-Cuoi-Cung-Truong-Viet-Thai.mp3",
            image:
                "./assets/img/song6.jpg"
        },
        {
            name: "Lấy anh đi",
            singer: "Thành Xi",
            path: "./assets/music/lad.mp3",
            image:
                "./assets/img/song7.jpg"
        },
        {
            name: "Lặng yên",
            singer: "Bùi Anh Tuấn",
            path: "./assets/music/ly.mp3",
            image:
                "./assets/img/song8.jpg"
        }, 
        {
            name: "my-love",
            singer: "Thành Xi",
            path: "./assets/music/my-love.mp3",
            image:
                "./assets/img/song9.jpg"
        }, 
        {
            name: "Take me to your heart",
            singer: "Huệ óc chó",
            path: "./assets/music/teck.mp3",
            image:
                "./assets/img/song10.jpg"
        },
        {
            name: "Thế giới và em anh chọn em",
            singer: "Yêu em",
            path: "./assets/music/The-Gioi-Va-Em-Anh-Chon-Em-Tuan-Hung.mp3",
            image:
                "./assets/img/song11.jpg"
        },
        {
            name: "Thu cuối",
            singer: "Huệ óc chó",
            path: "./assets/music/Thu-Cuoi-Yanbi-Mr-T-Hang-BingBoong.mp3",
            image:
                "./assets/img/song7.jpg"
        }

    ],

    setConfig: function(key, value) {
        this.config[key] = value;
        localStorage.getItem(PLAYER_STORAGE_KEY, this.config);
    },
        // lấy ra các daanh sách bài hát
    render: function () {   
        const htmls = this.songs.map((songs, index) => { // lấy ra các bài hát có trong danh sách song gà gán cho biến html
            return `
            <div class="song ${index === this.currentIndex ? 'active':''}" data-index = ${index}> <!-- kiểm tra nếu bài hiện tại là bài bài đang phát thì thêm class active ngược lại thì k thêm gì( toán tử 3 ngôi) -->
            <div class="thumb" style="background-image: url('${songs.image}')">
            </div>
            <div class="body">
              <h3 class="title">${songs.name}</h3>
              <p class="author">${songs.singer}</p>
            </div>
            <div class="option">
              <i class="fas fa-ellipsis-h"></i>
            </div>
          </div>
            `
        });
        playlist.innerHTML = htmls.join('');  // huyển dổi chuỗi string sang kiểu HTML

    },


        // định nghĩa các thuộc tính cho object
    defineProperties: function() {
        Object.defineProperty(this, 'currentSong', {  //defineProperty thuộc tính có sẵn
            get: function(){
                return this.songs[this.currentIndex] // trả về giá trị đầu tiên trong danh sách song    
            }
        })
    },


        // lắng nge và sử lý các sự kiện(dom evevt)
    handelEvent: function() {  // hàm sử lý các sự kiện
        const _this =  this;

        // xử lý CD Quay và dừng
        const cdThumbAnimate = cdThumb.animate([
            {transform: 'rotate(360deg)'}
        ],{
            duration: 10000, // quay 1 vòng trong 10S
            iterations: Infinity// quay số vòng vô hạn
        })

        cdThumbAnimate.pause(); // khi chưa phát nhạc thì mặc định không quay

        // xử lý phóng to thu nhỏ cd
        const cdWidth = cd.offsetWidth // lấy ra chiều dài hiện tại của thẻ cd
        document.onscroll = function(){  // sự kiện kéo thanh trượt dọc
            const scrollTop = window.scrollY || document.documentElement.scrollTop;  // lấy ra các giá trị khi kéo thanh trượt dọc
            const newCdWidth = cdWidth - scrollTop;  // láy ra chiều dài mới cho thẻ cd
            cd.style.width = newCdWidth > 0 ? newCdWidth + 'px' : 0; // css ại cho thẻ cd có chiều dài bằng với độ dài của newCdWidth
                    // toán tử 3 ngôi: nếu newCdWidth > 0 thì  cd = newCdWidth và nếu newCdWidth < 0 thì cd bằng 0
            cd.style.opacity = newCdWidth / cdWidth  // css độ mờ tỉ lệ theo chiều dài mới / chiều dài cũ
        }


        // xử lý khi click btn play
        playBtn.onclick = function() {
            if(_this.isPlaying){ // nếu hạc đang phát thì bám để dừng
                audio.pause();
            }else{
                audio.play()// phát bài hát
            }
        }

        // xử lý các trạng thái
        // khi bài hát được play
        audio.onplay = function() {
            _this.isPlaying = true  // trạng thái phát nhạc
            play.classList.add('playing') // thêm class playing cho thẻ player
            cdThumbAnimate.play() // khi phát nhạc thì đĩa quay
        }

         // khi bài hát được dừng
         audio.onpause = function() {
            _this.isPlaying = false  // trạng thái dừng phát nhạc
            play.classList.remove('playing') // xóa class playing khỏi thẻ play
            cdThumbAnimate.pause(); // khi dừng nhạc thì dừng
        }


        // khi nhạc phát hiển thị tiến  độ bài hát thay đổi
        audio.ontimeupdate = function() {
            if(audio.duration) { // kiểm tra khi audio.duration không phải NAN
                const  progressPercent = Math.floor((audio.currentTime / audio.duration) * 100); // dặt giá trị phần trăm progress = thời gian phát hiện tại / tổng time phát *100
                                                    //audio.duration: tính time phát hiện tại (thuộc tính có trong HTML Audio/Video DOM Reference w3school)
                                                    //audio.duration tổng time phát 
                progress.value = progressPercent;
            }
        }


        // xử lý khi tua nhạc
        progress.onchange = function(e) {  // bắt sự kiện onchange(sự thay đổi)
            const seekTime =(e.target.value / 100) * audio.duration;  // khai báo time hiện tại của bài hát sau khi tua = pàn trăm bài hát được tua / 100 nhân với tổng % của bài hát
            audio.currentTime = seekTime;  // đặt time phát mới cho thẻ audio

        }


        // xử lý khi phát bài kế tiếp
        nextBtn.onclick = function() {
            if(_this.isRandom ){  // nếu _this.isRandom = true( được bật random) thì chuyển bài theo random
            _this.playRandomSong()
            }
            else{
                _this.nextSong();// nếu _this.isRandom = false(không được bật random) thì chuyển bài kế tiếp
            }
            audio.play();  // play để phát
            _this.render(); // render lại danh sách bài hát
            _this.scroolToActiveSong();
        }


        // xử lý lùi về bài tiếp theo
        prevtBtn.onclick = function() {
            if(_this.isRandom){// nếu _this.isRandom = true( được bật random) thì chuyển bài theo random
            _this.playRandomSong()
            }else{
                _this.prevSong();// nếu _this.isRandom = false(không được bật random) thì chuyển bài trước nó
            }
            audio.play();   
            _this.render(); // render lại danh sách bài hát
            _this.scroolToActiveSong();
        }

        

        // xử lý random bật tắt
        randomBtn.onclick = function(e){
            _this.isRandom = !_this.isRandom; // đảo trạng thái mỗi khi click
            // _this.setConfig('isRandom', _this.isRandom);
            randomBtn.classList.toggle('active', _this.isRandom) // hàm toggle thêm class nếu chưa có và xóa nếu đang có
              // giải thích: nếu _this.isRandom =  true thì toggle xóa class active 
              //             nếu _this.isRandom) = false thì toggle thêm class actve

        }


        // xử lý chỉ phát một bài
        repeatBtb.onclick = function(e) {
            _this.isRepeat =! _this.isRepeat ; // đảo trạng thái nút mỗi khi click
            // _this.setConfig('isRepeat', _this.isRepeat);
            repeatBtb.classList.toggle('active', _this.isRepeat) // toggle thêm class nếu chưa có và xóa class nếu đã có
                                                // _this.isRepeat = true: xóa
                                                // _this.isRepeat = fale: thêm
        }



        // xử lý next sau khi phát hết một bài nhạc
        audio.onended = function() {
            if(_this.isRepeat){ // khi repeat thì phát lại bài đó liên tục
                audio.play(); // phát lại
            }else{ // không repeat thì next
                nextBtn.click();// click: hệ thống tự động click sau khi đã hết một bài
            }
        }

        // lắng nghe hành vi click vào playlist
        playlist.onclick = function(e) {
            const songNode = e.target.closest('.song:not(.active)');  // điều khiện bài đang không phát
            // điều kiện: khi click nếu không phải là thẻ đang phát hoặc là nút option( nút ...) thì lọt vào sử lý
            if(songNode || e.target.closest('.option') ){



                // xử lý khi click vào bài hát thì  chuyển luôn tới bài đó
                if(songNode){ // bắt sự kiện nếu click vào những bài đang không phát
                    _this.currentIndex = Number(songNode.dataset.index);   //songNode.dataset.index: chính là cái chỉ số index của thằng được click trả về dạng chuỗi nên phải Number đẻ chyển sang kiểu số
                    _this.loadCurrentSong(); // load thông tin bài hát lên cd
                    audio.play();// phát bài được click 
                    _this.render(); // load lại danh sách bài hát
                }


                // xử lý khi click vào nút option
                if(e.target.closest('.option')){

                }
            }
        }
    },


    scroolToActiveSong: function() { // hamf tạo độ trễ sau khi next
        setTimeout(()=>{
            $('.song.active').scrollIntoView({  //scrollIntoView : dọi tới hàm có sẵn (lên mạng sheach để hiểu)
                behavior: 'smooth', // thuộc tính hiển thị trơn chu
                block: 'nearest' // trạng thái gần tới nơi có thể nhìn thấy
            })
        },100) // độ trễ
    },


    // tải bài hát dầu tiên vào ứng dụng
    loadCurrentSong: function() {

        heading.textContent = this.currentSong.name; // css lại tên bài hát = tên bài đang đk phát
        cdThumb.style.backgroundImage = `url('${this.currentSong.image}')`   // css lại ảnh 
        audio.src = this.currentSong.path // thêm link nhạc cho thẻ phát

        
    },


    // next nhạc tiến
    nextSong: function() {
        this.currentIndex++  // next thì giá trị currentIndex tăng lên 1
        if(this.currentIndex >= this.songs.length){ // khi giá trị currentIndex tăng đến cuối danh sách thì quay lại giá trị đầu tiên
            this.currentIndex = 0;// quay lại giá trị đầu tiên
        }

        this.loadCurrentSong(); // gọi lại hàm load nhạc để load bài mới
    },

    
    // next nhạc lùi
    prevSong: function(){
        this.currentIndex--;
        if(this.currentIndex < 0){
            this.currentIndex = this.songs.length - 1;
        }

        this.loadCurrentSong()
    },


    //random bài nhạc
    playRandomSong: function() {
        let newIndex // tạo một biến lưu trữ giá trị index của bài mới
      do{
        newIndex = Math.floor(Math.random() * this.songs.length); // random ngẫu nhiên một bài trong danh sách
      }
      while(newIndex === this.currentIndex) // điều kiện bài mới không được trùng với bài cũ nếu trùng thì lặp lại

      this.currentIndex = newIndex; // gán giá trị mới load được cho currentIndex để phát
      this.loadCurrentSong(); // gọi lại
    },



   

    start: function () {   // hàm chạy 
        // định nghĩa các thuộc tính cho object
        this.defineProperties();

        // lắng nge và sử lý các sự kiện(dom evevt)
        this.handelEvent();

        // tải bài hát đầu tiên vào giao diện khi chạy ứng dụng
        this.loadCurrentSong();


        // lấy ra các daanh sách bài hát
        this.render();


    }
}

app.start(); // chạy js








// // code anh sơn


// // Một số bài hát có thể bị lỗi do liên kết bị hỏng. Vui lòng thay thế liên kết khác để có thể phát
// // Some songs may be faulty due to broken links. Please replace another link so that it can be played

// const $ = document.querySelector.bind(document);
// const $$ = document.querySelectorAll.bind(document);

// const PlAYER_STORAGE_KEY = "F8_PLAYER";

// const player = $(".player");
// const cd = $(".cd");
// const heading = $("header h2");
// const cdThumb = $(".cd-thumb");
// const audio = $("#audio");
// const playBtn = $(".btn-toggle-play");
// const progress = $("#progress");
// const prevBtn = $(".btn-prev");
// const nextBtn = $(".btn-next");
// const randomBtn = $(".btn-random");
// const repeatBtn = $(".btn-repeat");
// const playlist = $(".playlist");

// const app = {
//   currentIndex: 0,
//   isPlaying: false,
//   isRandom: false,
//   isRepeat: false,
//   config: {},
//   // (1/2) Uncomment the line below to use localStorage
// //   config: JSON.parse(localStorage.getItem(PlAYER_STORAGE_KEY)) || {},
//   songs: [
//     {
//       name: "Click Pow Get Down",
//       singer: "Raftaar x Fortnite",
//       path: "https://mp3.vlcmusic.com/download.php?track_id=34737&format=320",
//       image: "https://i.ytimg.com/vi/jTLhQf5KJSc/maxresdefault.jpg"
//     },
//     {
//       name: "Tu Phir Se Aana",
//       singer: "Raftaar x Salim Merchant x Karma",
//       path: "https://mp3.vlcmusic.com/download.php?track_id=34213&format=320",
//       image:
//         "https://1.bp.blogspot.com/-kX21dGUuTdM/X85ij1SBeEI/AAAAAAAAKK4/feboCtDKkls19cZw3glZWRdJ6J8alCm-gCNcBGAsYHQ/s16000/Tu%2BAana%2BPhir%2BSe%2BRap%2BSong%2BLyrics%2BBy%2BRaftaar.jpg"
//     },
//     {
//       name: "Naachne Ka Shaunq",
//       singer: "Raftaar x Brobha V",
//       path:
//         "https://mp3.filmysongs.in/download.php?id=Naachne Ka Shaunq Raftaar Ft Brodha V Mp3 Hindi Song Filmysongs.co.mp3",
//       image: "https://i.ytimg.com/vi/QvswgfLDuPg/maxresdefault.jpg"
//     },
//     {
//       name: "Mantoiyat",
//       singer: "Raftaar x Nawazuddin Siddiqui",
//       path: "https://mp3.vlcmusic.com/download.php?track_id=14448&format=320",
//       image:
//         "https://a10.gaanacdn.com/images/song/39/24225939/crop_480x480_1536749130.jpg"
//     },
//     {
//       name: "Aage Chal",
//       singer: "Raftaar",
//       path: "https://mp3.vlcmusic.com/download.php?track_id=25791&format=320",
//       image:
//         "https://a10.gaanacdn.com/images/albums/72/3019572/crop_480x480_3019572.jpg"
//     },
//     {
//       name: "Damn",
//       singer: "Raftaar x kr$na",
//       path:
//         "https://mp3.filmisongs.com/go.php?id=Damn%20Song%20Raftaar%20Ft%20KrSNa.mp3",
//       image:
//         "https://filmisongs.xyz/wp-content/uploads/2020/07/Damn-Song-Raftaar-KrNa.jpg"
//     },
//     {
//       name: "Feeling You",
//       singer: "Raftaar x Harjas",
//       path: "https://mp3.vlcmusic.com/download.php?track_id=27145&format=320",
//       image:
//         "https://a10.gaanacdn.com/gn_img/albums/YoEWlabzXB/oEWlj5gYKz/size_xxl_1586752323.webp"
//     }
//   ],
//   setConfig: function (key, value) {
//     this.config[key] = value;
//     // (2/2) Uncomment the line below to use localStorage
//     // localStorage.setItem(PlAYER_STORAGE_KEY, JSON.stringify(this.config));
//   },
//   render: function () {
//     const htmls = this.songs.map((song, index) => {
//       return `
//                         <div class="song ${
//                           index === this.currentIndex ? "active" : ""
//                         }" data-index="${index}">
//                             <div class="thumb"
//                                 style="background-image: url('${song.image}')">
//                             </div>
//                             <div class="body">
//                                 <h3 class="title">${song.name}</h3>
//                                 <p class="author">${song.singer}</p>
//                             </div>
//                             <div class="option">
//                                 <i class="fas fa-ellipsis-h"></i>
//                             </div>
//                         </div>
//                     `;
//     });
//     playlist.innerHTML = htmls.join("");
//   },
//   defineProperties: function () {
//     Object.defineProperty(this, "currentSong", {
//       get: function () {
//         return this.songs[this.currentIndex];
//       }
//     });
//   },
//   handleEvents: function () {
//     const _this = this;
//     const cdWidth = cd.offsetWidth;

//     // Xử lý CD quay / dừng
//     // Handle CD spins / stops
//     const cdThumbAnimate = cdThumb.animate([{ transform: "rotate(360deg)" }], {
//       duration: 10000, // 10 seconds
//       iterations: Infinity
//     });
//     cdThumbAnimate.pause();

//     // Xử lý phóng to / thu nhỏ CD
//     // Handles CD enlargement / reduction
//     document.onscroll = function () {
//       const scrollTop = window.scrollY || document.documentElement.scrollTop;
//       const newCdWidth = cdWidth - scrollTop;

//       cd.style.width = newCdWidth > 0 ? newCdWidth + "px" : 0;
//       cd.style.opacity = newCdWidth / cdWidth;
//     };

//     // Xử lý khi click play
//     // Handle when click play
//     playBtn.onclick = function () {
//       if (_this.isPlaying) {
//         audio.pause();
//       } else {
//         audio.play();
//       }
//     };

//     // Khi song được play
//     // When the song is played
//     audio.onplay = function () {
//       _this.isPlaying = true;
//       player.classList.add("playing");
//       cdThumbAnimate.play();
//     };

//     // Khi song bị pause
//     // When the song is pause
//     audio.onpause = function () {
//       _this.isPlaying = false;
//       player.classList.remove("playing");
//       cdThumbAnimate.pause();
//     };

//     // Khi tiến độ bài hát thay đổi
//     // When the song progress changes
//     audio.ontimeupdate = function () {
//       if (audio.duration) {
//         const progressPercent = Math.floor(
//           (audio.currentTime / audio.duration) * 100
//         );
//         progress.value = progressPercent;
//       }
//     };

//     // Xử lý khi tua song
//     // Handling when seek
//     progress.onchange = function (e) {
//       const seekTime = (audio.duration / 100) * e.target.value;
//       audio.currentTime = seekTime;
//     };

//     // Khi next song
//     // When next song
//     nextBtn.onclick = function () {
//       if (_this.isRandom) {
//         _this.playRandomSong();
//       } else {
//         _this.nextSong();
//       }
//       audio.play();
//       _this.render();
//       _this.scrollToActiveSong();
//     };

//     // Khi prev song
//     // When prev song
//     prevBtn.onclick = function () {
//       if (_this.isRandom) {
//         _this.playRandomSong();
//       } else {
//         _this.prevSong();
//       }
//       audio.play();
//       _this.render();
//       _this.scrollToActiveSong();
//     };

//     // Xử lý bật / tắt random song
//     // Handling on / off random song
//     randomBtn.onclick = function (e) {
//       _this.isRandom = !_this.isRandom;
//       _this.setConfig("isRandom", _this.isRandom);
//       randomBtn.classList.toggle("active", _this.isRandom);
//     };

//     // Xử lý lặp lại một song
//     // Single-parallel repeat processing
//     repeatBtn.onclick = function (e) {
//       _this.isRepeat = !_this.isRepeat;
//       _this.setConfig("isRepeat", _this.isRepeat);
//       repeatBtn.classList.toggle("active", _this.isRepeat);
//     };

//     // Xử lý next song khi audio ended
//     // Handle next song when audio ended
//     audio.onended = function () {
//       if (_this.isRepeat) {
//         audio.play();
//       } else {
//         nextBtn.click();
//       }
//     };

//     // Lắng nghe hành vi click vào playlist
//     // Listen to playlist clicks
//     playlist.onclick = function (e) {
//       const songNode = e.target.closest(".song:not(.active)");

//       if (songNode || e.target.closest(".option")) {
//         // Xử lý khi click vào song
//         // Handle when clicking on the song
//         if (songNode) {
//           _this.currentIndex = Number(songNode.dataset.index);
//           _this.loadCurrentSong();
//           _this.render();
//           audio.play();
//         }

//         // Xử lý khi click vào song option
//         // Handle when clicking on the song option
//         if (e.target.closest(".option")) {
//         }
//       }
//     };
//   },
//   scrollToActiveSong: function () {
//     setTimeout(() => {
//       $(".song.active").scrollIntoView({
//         behavior: "smooth",
//         block: "nearest"
//       });
//     }, 300);
//   },
//   loadCurrentSong: function () {
//     heading.textContent = this.currentSong.name;
//     cdThumb.style.backgroundImage = `url('${this.currentSong.image}')`;
//     audio.src = this.currentSong.path;
//   },
//   loadConfig: function () {
//     this.isRandom = this.config.isRandom;
//     this.isRepeat = this.config.isRepeat;
//   },
//   nextSong: function () {
//     this.currentIndex++;
//     if (this.currentIndex >= this.songs.length) {
//       this.currentIndex = 0;
//     }
//     this.loadCurrentSong();
//   },
//   prevSong: function () {
//     this.currentIndex--;
//     if (this.currentIndex < 0) {
//       this.currentIndex = this.songs.length - 1;
//     }
//     this.loadCurrentSong();
//   },
//   playRandomSong: function () {
//     let newIndex;
//     do {
//       newIndex = Math.floor(Math.random() * this.songs.length);
//     } while (newIndex === this.currentIndex);

//     this.currentIndex = newIndex;
//     this.loadCurrentSong();
//   },
//   start: function () {
//     // Gán cấu hình từ config vào ứng dụng
//     // Assign configuration from config to application
//     this.loadConfig();

//     // Định nghĩa các thuộc tính cho object
//     // Defines properties for the object
//     this.defineProperties();

//     // Lắng nghe / xử lý các sự kiện (DOM events)
//     // Listening / handling events (DOM events)
//     this.handleEvents();

//     // Tải thông tin bài hát đầu tiên vào UI khi chạy ứng dụng
//     // Load the first song information into the UI when running the app
//     this.loadCurrentSong();

//     // Render playlist
//     this.render();

//     // Hiển thị trạng thái ban đầu của button repeat & random
//     // Display the initial state of the repeat & random button
//     randomBtn.classList.toggle("active", this.isRandom);
//     repeatBtn.classList.toggle("active", this.isRepeat);
//   }
// };

// app.start();





