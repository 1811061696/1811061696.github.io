const quizData = [
    {
        question: 'Đố bạn chuột nào đi bằng 2 chân?',
        a: 'Chuột cống',
        b: 'Chuột đồng',
        c: 'Chuột Míckey',
        d: 'Chuột chết',
        correct: 'c',
    },

    {
        question: 'Đố bạn vịt nào đi bằng 2 chân?',
        a: 'Vịt không bị què thì đi bằng 2 chân',
        b: 'Vịt quay',
        c: 'Vị trời',
        d: 'Vịt siêu trứng',
        correct: 'a',
    },

    {
        question: 'Sở thú bị cháy ,đố bạn con gì chạy ra đầu tiên?',
        a: 'Con voi',
        b: 'Con khỉ',
        c: 'Con người',
        d: 'Con hổ',
        correct: 'c',
    },

    {
        question: 'Một ly thuỷ tinh đựng đầy nước, làm thế nào để lấy nước dưới đáy ly mà không đổ nước ra ngoài ?',
        a: 'Không thể lấy',
        b: 'Ống hút',
        c: 'Dựng ly lại',
        d: 'Đập vỡ ly',
        correct: 'b',
    },

    {
        question: 'Cái gì người mua biết, người bán biết, người xài không bao giờ biết?',
        a: 'Không biết',
        b: 'Đi mà hỏi người ta',
        c: 'Tiền',
        d: 'Quan tài',
        correct: 'd',
    },

    {
        question: 'Cũng trong một cuộc đua, bạn vừa chạy qua người cuối cùng. Vậy bạn đang ở vị trí nào?',
        a: 'Ở giữa',
        b: 'Bạn không tham gia',
        c: 'Cuối cùng.',
        d: 'Đầu tiên',
        correct: 'c',
    },

    {
        question: 'Cái gì có kích thước bằng con voi nhưng chẳng nặng gram nào cả?',
        a: 'Bóng con voi',
        b: 'Vợ con voi',
        c: 'Bố con voi',
        d: 'Con coi con',
        correct: 'a',
    },

    {
        question: 'Năm nay Nguyễn Quang Thành bao nhiêu tuổi?',
        a: '20',
        b: '19',
        c: '18',
        d: '22',
        correct: 'd',
    },

    {
        question: 'Bạn đang học ngôn ngũ gì?',
        a: 'PHP',
        b: 'Javascript',
        c: 'Java',
        d: 'ReactJS',
        correct: 'b',
    },

    {
        question: 'Trái nào khác với các trái còn lại?',
        a: 'Khoai tây',
        b: 'Mận',
        c: 'Mơ',
        d: 'Đào',
        correct: 'a',
    },
]

const questionElement = document.getElementById('question');
const quiz = document.getElementById('quiz');
const a_text = document.getElementById('a_text');
const b_text = document.getElementById('b_text');
const c_text = document.getElementById('c_text');
const d_text = document.getElementById('d_text');
const submitBtn = document.getElementById('submit')
const answerEls = document.querySelectorAll('.answer');

let currentQuestion = 0;
let score = 0;

loadQuiz();

function loadQuiz() {
    deleteAnswers()
    const currentQuizData = quizData[currentQuestion];
    questionElement.innerText = currentQuizData.question;
    a_text.innerText = currentQuizData.a;
    b_text.innerText = currentQuizData.b;
    c_text.innerText = currentQuizData.c;
    d_text.innerText = currentQuizData.d;

}

function getSelected() {
    let answer = undefined;

    answerEls.forEach(answerEl => {
        if (answerEl.checked) {
            answer = answerEl.id;
        }
    })

    return answer
}

function deleteAnswers() {
    answerEls.forEach(answerEl => {
        answerEl.checked = false;
    })
}

submitBtn.addEventListener('click', () => {
    const answer = getSelected()
    console.log(answer)
    if (answer) {

        if (answer === quizData[currentQuestion].correct) {
            score++;
        }
        currentQuestion++;
        if (currentQuestion < quizData.length) {
            loadQuiz();
        }
        else {
            quiz.innerHTML = `
            <h2>Số câu đúng là: ${score} / ${quizData.length} câu hỏi</h2>
            <button onclick="location.reload()">Làm lại</button>
            `
        }
    }
})