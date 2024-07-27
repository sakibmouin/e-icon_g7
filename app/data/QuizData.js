export default QuizData = [
  {
    question: "I have felt tensed,anxious or nervous",
    options: [
      "Not at all",
      "Only Occassionally",
      "Sometimes",
      "Often",
      "Most or all of the time",
    ],
    correct_option: [
      {
        notatall: 0,
        onlyoccasionally: 1,
        sometimes: 2,
        often: 3,
        allofthetime: 4,
        key: function (n) {
          return this[Object.keys(this)[n]];
        },
      },
    ],
  },
  {
    question: "I have felt that I have someone to turn support when needed",
    options: [
      "Not at all",
      "Only Occassionally",
      "Sometimes",
      "Often",
      "Most or all of the time",
    ],
    correct_option: [
      {
        notatall: 4,
        onlyoccasionally: 3,
        sometimes: 2,
        often: 1,
        allofthetime: 0,
        key: function (n) {
          return this[Object.keys(this)[n]];
        },
      },
    ],
  },
  {
    question: "I feel like class time is boring",
    options: [
      "Not at all",
      "Only Occassionally",
      "Sometimes",
      "Often",
      "Most or all of the time",
    ],
    correct_option: [
      {
        notatall: 0,
        onlyoccasionally: 1,
        sometimes: 2,
        often: 3,
        allofthetime: 4,
        key: function (n) {
          return this[Object.keys(this)[n]];
        },
      },
    ],
  },
  {
    question:
      "I have conflict with parents due to their excessive interference ",
    options: [
      "Not at all",
      "Only Occassionally",
      "Sometimes",
      "Often",
      "Most or all of the time ",
    ],
    correct_option: [
      {
        notatall: 0,
        onlyoccasionally: 1,
        sometimes: 2,
        often: 3,
        allofthetime: 4,
        key: function (n) {
          return this[Object.keys(this)[n]];
        },
      },
    ],
  },
  {
    question: "Talking to people has felt too much for me ",
    options: [
      "Not at all",
      "Only Occassionally",
      "Sometimes",
      "Often",
      "Most or all of the time",
    ],
    correct_option: [
      {
        notatall: 0,
        onlyoccasionally: 1,
        sometimes: 2,
        often: 3,
        allofthetime: 4,
        key: function (n) {
          return this[Object.keys(this)[n]];
        },
      },
    ],
  },
  {
    question: "I made plans to end my life",
    options: [
      "Not at all",
      "Only Occassionally",
      "Sometimes",
      "Often",
      "Most or all of the time",
    ],
    correct_option: [
      {
        notatall: 0,
        onlyoccasionally: 1,
        sometimes: 2,
        often: 3,
        allofthetime: 4,
        key: function (n) {
          return this[Object.keys(this)[n]];
        },
      },
    ],
  },
  {
    question: "I have had difficulties getting to sleep or staying asleep",
    options: [
      "Not at all",
      "Only Occassionally",
      "Sometimes",
      "Often",
      "Most or all of the time",
    ],
    correct_option: [
      {
        notatall: 0,
        onlyoccasionally: 1,
        sometimes: 2,
        often: 3,
        allofthetime: 4,
        key: function (n) {
          return this[Object.keys(this)[n]];
        },
      },
    ],
  },
  {
    question: "I have felt despairing or hopeless",
    options: [
      "Not at all",
      "Only Occassionally",
      "Sometimes",
      "Often",
      "Most or all of the time",
    ],
    correct_option: [
      {
        notatall: 0,
        onlyoccasionally: 1,
        sometimes: 2,
        often: 3,
        allofthetime: 4,
        key: function (n) {
          return this[Object.keys(this)[n]];
        },
      },
    ],
  },
  {
    question:
      "I feel that human relationships are difficult in discord with friends, senior and junior relationships.",
    options: [
      "Not at all",
      "Only Occassionally",
      "Sometimes",
      "Often",
      "Most or all of the time",
    ],
    correct_option: [
      {
        notatall: 0,
        onlyoccasionally: 1,
        sometimes: 2,
        often: 3,
        allofthetime: 4,
        key: function (n) {
          return this[Object.keys(this)[n]];
        },
      },
    ],
  },
  {
    question: "Unwanted images or memories have been distressing me",
    options: [
      "Not at all",
      "Only Occassionally",
      "Sometimes",
      "Often",
      "Most or all of the time",
    ],
    correct_option: [
      {
        notatall: 0,
        onlyoccasionally: 1,
        sometimes: 2,
        often: 3,
        allofthetime: 4,
        key: function (n) {
          return this[Object.keys(this)[n]];
        },
      },
    ],
  },
];
