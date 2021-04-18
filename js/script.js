// Documentazione API TMDB:
// https://developers.themoviedb.org/3/search/search-companies

const app = new Vue ({
  el: '#app',
  data: {
    baseURL: 'https://api.themoviedb.org/3/search/',
    paramsAxios: {
      params: {
        language: 'it-IT',
        api_key: 'afbb7def2542bc20b7d5bfd24baf9b6a',
        query: '',
        page: 1,
      }
    },
    moviesQuery: [],
    tvSeriesQuery: [],
    moviesQueryShow: [],
    tvSeriesQueryShow: [],
    TitleInput: '',
    moviePages: 1,
    tvPages: 1,
    flags: ['en', 'de', 'es', 'fr', 'it', 'pt'],
    btnMovSelected: 1,
    btnTvSelected: 1,
  },
  methods: {
    apiGet(type, page) {
      this.paramsAxios.params.page = page;
      this.paramsAxios.params.query = this.TitleInput;
      return axios.get( this.baseURL + type, this.paramsAxios );
    },
    search() {
      if ( document.getElementById('title-search').value != '' ) {
        this.TitleInput = document.getElementById('title-search').value;
        if ( this.TitleInput != '' ) {
          this.getMovies();
          this.getSeries();
        }
      }
    },
    getMovies(page = 1) {
      this.apiGet('movie', page)
      .then( (arr) => {
        this.moviesQuery = arr.data.results;
        this.moviePages = arr.data.total_pages;
        this.btnMovSelected = page;
        this.convertVoteAvg(this.moviesQuery);
        this.moviesQueryShow = [];
        this.setMoviesIndex();
      });
    },
    getSeries(page = 1) {
      this.apiGet('tv', page)
      .then( (arr) => {
        this.tvSeriesQuery = arr.data.results;
        this.tvPages = arr.data.total_pages;
        this.btnTvSelected = page;
        this.convertVoteAvg(this.tvSeriesQuery);
        this.tvSeriesQueryShow = [];
        this.setTvIndex();
      });
    },
    setMoviesIndex() {
      let i = 0;
      while ( i < 4 && i < this.moviesQuery.length ) {
        this.moviesQueryShow.push(i);
        i++;
      }
    },
    nextMoviesIndex() {
      if ( this.moviesQueryShow[ this.moviesQueryShow.length - 1 ] != this.moviesQuery.length - 1 ) {
        let i = 0;
        const iMov = this.moviesQueryShow[ this.moviesQueryShow.length - 1 ];
        this.moviesQueryShow = [];
        while ( i < 4 && iMov + i < this.moviesQuery.length - 1 ) {
          this.moviesQueryShow[i] = iMov + 1 + i;
          i++;
        }
      }
      this.$forceUpdate();
    },
    prevMoviesIndex() {
      if ( this.moviesQueryShow[0] != 0 ) {
        let i = 0;
        let iMov = this.moviesQueryShow[0];
        while ( i < 4 && iMov - i > 0 ) {
          this.moviesQueryShow[i] = iMov - 1 - i;
          i++;
        }
      }
      this.moviesQueryShow.sort(function(n1, n2) {
        return n1 - n2;
      });
      this.$forceUpdate();
    },
    setTvIndex() {
      let i = 0;
      while ( i < 4 && i < this.tvSeriesQuery.length ) {
        this.tvSeriesQueryShow.push(i);
        i++;
      }
    },
    nextTvIndex() {
      if ( this.tvSeriesQueryShow[ this.tvSeriesQueryShow.length - 1 ] != this.tvSeriesQuery.length - 1 ) {
        console.log('ciao');
        let i = 0;
        const iMov = this.tvSeriesQueryShow[ this.tvSeriesQueryShow.length - 1 ];
        this.tvSeriesQueryShow = [];
        while ( i < 4 && iMov + i < this.tvSeriesQuery.length - 1 ) {
          this.tvSeriesQueryShow[i] = iMov + 1 + i;
          i++;
        }
      }
      this.$forceUpdate();
    },
    prevTvIndex() {
      if ( this.tvSeriesQueryShow[0] != 0 ) {
        let i = 0;
        let iMov = this.tvSeriesQueryShow[0];
        while ( i < 4 && iMov - i > 0 ) {
          this.tvSeriesQueryShow[i] = iMov - 1 - i;
          i++;
        }
      }
      this.tvSeriesQueryShow.sort(function(n1, n2) {
        return n1 - n2;
      });
      this.$forceUpdate();
    },
    convertVoteAvg(thisArr) {
      thisArr.forEach( (movie) => {
        const rating = Math.round( movie.vote_average / 2 );
        movie['rating'] = rating;
      })
    },
  }
});
