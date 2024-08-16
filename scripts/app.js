const app = Vue.createApp({
    data() {
        return {
            RandomFact: '',
            CurrentWeather: {
                city: '',
                Temperature: '',
                Wind: '',
                Description: ''
            },
            Dictionary: {
                Word: '',
                Phonetic: '',
                PartOfSpeech: '',
                Definition: ''
            },
            city: 'London', //default city name           
            wordToDefine: ''     
        };
    },

    methods: {
        getRandomFact() {
            fetch(`https://uselessfacts.jsph.pl/api/v2/facts/random`) //fetch the random fact
                .then(response => response.json()) //parse response as json
                .then(data => {this.RandomFact = data.text;})
                .catch(error => console.error('Error:', error)) //log any errors

        },
        getCurrentWeather() {
            fetch(`https://goweather.herokuapp.com/weather/${this.city}`) //fetch the given city's weather
                .then(response => response.json()) //parse response as json
                .then(data => {
                    this.CurrentWeather.Temperature = data.temperature;
                    this.CurrentWeather.Wind = data.wind;
                    this.CurrentWeather.Description = data.description;
                })
                .catch(error => console.error('Error:', error)) //log any errors
        },
        defineWord() {
            fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${this.wordToDefine}`) //fetch the meaning of the word
                .then(response => response.json()) //parse response as json
                .then(data => {
                    this.Dictionary.Word = data[0].word;
                    this.Dictionary.Phonetic = data[0].phonetic;
                    this.Dictionary.PartOfSpeech = data[0].meanings[0].partOfSpeech;
                    this.Dictionary.Definition = data[0].meanings[0].definitions[0].definition;
                })
                .catch(error => console.error('Error:', error)) //log any errors
        }
    },

    mounted() {
        this.getRandomFact();
        this.getCurrentWeather(); 
    }
});

app.mount('#app');
