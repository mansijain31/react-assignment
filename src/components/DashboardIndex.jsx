  import React, { Component } from 'react'
  import './style.scss'
  import ReactDOM from 'react-dom'
  import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
  import { faSearch } from '@fortawesome/free-solid-svg-icons'
  import { stateClickData, TableData, HandleKeyData} from '../helpers/apiData.js'
  import { DefaultStateData} from '../helpers/apiData.js'
  import { TableDataRender } from '../helpers/apiData.js'
  import { HandleClickData } from '../helpers/apiData'


  class DashboardIndex extends Component {
  constructor() {
  super();
  this.state = {
  Confirmed: null,
  activeCases: null,
  Cured: null,
  Death: null,
  stateWiseData: [],
  stateName: null,
  stateConfirm: null,
  stateActive: null,
  stateRecover: null,
  stateDeath: null,
  searchValue: null,
  dateCurrent: null,
  activeSuggestion: 0,
  filteredSuggestions: [],
  showSuggestions: false,
  userInput: ""

  }
  this.handleChange = this.handleChange.bind(this);
  this.handleKey = this.handleKey.bind(this);
  this.handleClick = this.handleClick.bind(this);
  this.onClickData = this.onClickData.bind(this);

  }

  handleKey = event => {
  const keyCode = event.keyCode || event.which;
  if (keyCode === 13) {
  let i = ''
  HandleKeyData(this.state.userInput).then(data => {
  for(i in data.data)
  {
  this.setState({
  stateName: data.data[i].name,
  stateConfirm:  data.data[i].total,
  stateRecover:  data.data[i].cured,
  stateActive:  data.data[i].active,
  stateDeath:  data.data[i].death
  }) 
  }
  })
  }
  };

  handleClick(event) {
  let i = ''
  HandleClickData(this.state.userInput).then(data => {
  for(i in data.data)
  {
  this.setState({
  stateName: data.data[i].name,
  stateConfirm:  data.data[i].total,
  stateRecover:  data.data[i].cured,
  stateActive:  data.data[i].active,
  stateDeath:  data.data[i].death
  }) 
  }
  })
  }

  onClickData(event) {
  this.setState({
  activeSuggestion: 0,
  filteredSuggestions: [],
  showSuggestions: false,
  userInput: event.currentTarget.innerText
  });

  };

  handleChange(event) {
    const suggestions  = [ "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jammu and Kashmir",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttarakhand",
    "Uttar Pradesh",
    "West Bengal",
    "Andaman and Nicobar Islands",
    "Chandigarh",
    "Dadra and Nagar Haveli",
    "Daman and Diu",
    "Delhi",
    "Lakshadweep",
    "Puducherry"]
    let userInput = event.currentTarget.value;
    const filteredSuggestions = suggestions.filter(
      suggestions =>
        suggestions.toLowerCase().indexOf(userInput.toLowerCase()) > -1
    );
    this.setState({
      activeSuggestion: 0,
      filteredSuggestions,
      showSuggestions: true,
      userInput: event.currentTarget.value
    });
  this.setState({ searchValue: event.target.value })

  };

  componentDidMount() {
  let j = 0;
  stateClickData().then( data => {
  console.log(data.statewise);
  this.setState({
    Confirmed: data.statewise[j].confirmed,
    activeCases: data.statewise[j].active,
    Cured: data.statewise[j].recovered,
    Death: data.statewise[j].deaths
  });

  })

  TableDataRender().then ( data => {
    this.setState({
      stateWiseData: data
      })
  })


  DefaultStateData().then ( data => {
  let i = ""
  for(i in data.data)
  {
  this.setState({
  stateName: data.data[i].name,
  stateConfirm:  data.data[i].total,
  stateRecover:  data.data[i].cured,
  stateActive:  data.data[i].active,
  stateDeath:  data.data[i].death
  }) 
  }
  })

  let today = new Date();
  let months = ["January", "February", "March", "April", "May", "June", "July",
  "August", "September", "October", "November", "December"
  ];
  let time = today.getHours() + ":" + today.getMinutes();
  let val = today.getDate() + " " + months[today.getMonth()] + " " + today.getFullYear();
  this.setState ({
  dateCurrent: val + " " + time
  })
  }

  renderTableData() {
  const stateWiseData = this.state.stateWiseData
  return this.state.stateWiseData.map((stateWiseData, index) => {
  const { state, confirmed, active, recovered, deaths } = stateWiseData //destructuring
  return (
  <tr key={state}>
  <td>{state}</td>
  <td>{confirmed}</td>
  <td>{active}</td>
  <td>{recovered}</td>
  <td>{deaths}</td>
  </tr>
  )
  }) 
  }

  render() { 
  const {
  onChange,
  onKeyDown,
  onClickData,
  state: {
  activeSuggestion,
  filteredSuggestions,
  showSuggestions,
  userInput
  }
  } = this;

  let suggestionsListComponent;

  if (showSuggestions && userInput) {
  if (filteredSuggestions.length) {
  suggestionsListComponent = (
  <div className="suggestions">
  {filteredSuggestions.map((suggestion, index) => {
  let className;

  // Flag the active suggestion with a class
  if (index === activeSuggestion) {
  className = "suggestion-active";
  }

  return (
  <li
  className={className}
  key={suggestion}
  onClick={this.onClickData}
  >
  {suggestion}
  </li>
  );
  })}
  </div>
  );
  } else {
  suggestionsListComponent = (
  <div class="no-suggestions">
  <em>No suggestions, you're on your own!</em>
  </div>
  );
  }
  }

  return (
  <div className="container">
  <div className="main">
  <div className="row margin-top" >
  <div className="col-md-6">
  <div className="search">
  <label>Search your city, resources, etc</label>
  <div className="search">
  <input type="text" value={this.state.value}
  onKeyUp={this.handleKey}
  onChange={this.handleChange} value={this.state.userInput} className="searchInput" />
    {suggestionsListComponent}

  <button type="button" className="searchBtn" onClick={this.handleClick}>
  <FontAwesomeIcon icon={faSearch} />
  </button>
  <div id="autocomplete"></div>
  </div>
  </div>
  </div>
  <div className="col-md-6" >
  <label className="countryHead">India</label>
  <div className="countryHeader">
  <div className="confirmedCountry">
  <span id="tag">Confirmed</span>
  <div id="confirmCases" className="number">{this.state.Confirmed}</div>
  </div>
  <div className="activeCountry">
  <span id="tag">Active</span>
  <div id="activeCases" className="number">{this.state.activeCases}</div>
  </div>
  <div className="recoveredCountry">
  <span id="tag">Recovered</span>
  <div id="recovered" className="number">{this.state.Cured}</div>
  </div>
  <div className="deathCountry">
  <span id="tag">Death</span>
  <div id="death" className="number">{this.state.Death}</div>
  </div>
  </div>
  </div>
  </div>
  <div className="row top-margin">
  <div className="col-md-4">
  <h4 id="stateName">{this.state.stateName}</h4>
  <div id="printDate">{this.state.dateCurrent}</div>
  <div className="stateData" >
  <div className="confirmed">
  <span id="tagState">Confirmed</span>
  <div id="stateConfirm">{this.state.stateConfirm}</div>
  <svg width="100" height="75" viewBox="0 0 100 75" preserveAspectRatio="xMidYMid meet">
  <path fill="none" stroke="#ff073a99" stroke-width="2.5" d="M5,28.11557788944723C6.5,28.11557788944723,8,28.11557788944723,9.5,28.11557788944723C11,28.11557788944723,12.5,23.366834170854275,14,23.366834170854275C15.5,23.366834170854275,17,27.353433835845898,18.5,27.587939698492463C20,27.822445561139027,21.5,27.705192629815745,23,27.93969849246231C24.5,28.174204355108873,26,32.95226130653266,27.5,32.95226130653266C29,32.95226130653266,30.5,30.57788944723618,32,30.22613065326633C33.5,29.87437185929648,35,30.050251256281406,36.5,29.698492462311556C38,29.346733668341706,39.5,24.42211055276382,41,24.42211055276382C42.5,24.42211055276382,44,24.480737018425458,45.5,24.59798994974874C47,24.715242881072022,48.5,29.78643216080402,50,29.78643216080402C51.5,29.78643216080402,53.00000000000001,24.15829145728643,54.50000000000001,24.15829145728643C56.00000000000001,24.15829145728643,57.5,25.902428810720274,59,26.444723618090457C60.5,26.987018425460644,62,27.133584589614742,63.5,27.412060301507537C65,27.690536013400333,66.5,28.11557788944723,68,28.11557788944723C69.5,28.11557788944723,71,27.236180904522612,72.5,27.236180904522612C74,27.236180904522612,75.5,27.353433835845895,77,27.587939698492463C78.5,27.82244556113903,80,29.889028475711893,81.5,30.84170854271357C83,31.794388609715245,84.5,33.30402010050251,86,33.30402010050251C87.5,33.30402010050251,89,32.395309882747064,90.5,31.984924623115575C92,31.574539363484085,93.5,31.208123953098827,95,30.84170854271357" stroke-dasharray="108.55895233154297" stroke-dashoffset="0"></path>
  <circle fill="#ff073a" r="2.5" cx="95" cy="30.84170854271357"></circle>
  </svg>
  </div>
  <div className="active">
  <span id="tagState">Active</span>
  <div id="stateActive">{this.state.stateActive}</div>
  <svg width="100" height="75" viewBox="0 0 100 75" preserveAspectRatio="xMidYMid meet">
  <path fill="none" stroke="#007bff99" stroke-width="2.5" d="M5,39.6356783919598C6.5,44.07663316582915,8,48.517587939698494,9.5,48.517587939698494C11,48.517587939698494,12.5,39.54773869346734,14,39.54773869346734C15.5,39.54773869346734,17,63.2035175879397,18.5,63.2035175879397C20,63.2035175879397,21.5,42.801507537688444,23,42.801507537688444C24.5,42.801507537688444,26,52.650753768844226,27.5,52.650753768844226C29,52.650753768844226,30.5,51.463567839195974,32,50.54020100502512C33.5,49.61683417085426,35,47.69681742043551,36.5,47.11055276381909C38,46.52428810720268,39.5,46.28978224455613,41,46.231155778894475C42.5,46.17252931323282,44,46.143216080402,45.5,46.143216080402C47,46.143216080402,48.5,50.54020100502512,50,50.54020100502512C51.5,50.54020100502512,53.00000000000001,42.361809045226124,54.50000000000001,42.361809045226124C56.00000000000001,42.361809045226124,57.5,43.94472361809046,59,43.94472361809046C60.5,43.94472361809046,62,42.7428810720268,63.5,42.361809045226124C65,41.98073701842545,66.5,41.65829145728643,68,41.65829145728643C69.5,41.65829145728643,71,41.77554438860972,72.5,42.01005025125628C74,42.244556113902846,75.5,42.56700167504187,77,43.68090452261306C78.5,44.79480737018425,80,58.27889447236181,81.5,58.27889447236181C83,58.27889447236181,84.5,53.70603015075377,86,53.70603015075377C87.5,53.70603015075377,89,54.849246231155774,90.5,54.849246231155774C92,54.849246231155774,93.5,53.48618090452261,95,52.12311557788944" stroke-dasharray="168.66925048828125" stroke-dashoffset="0"></path>
  <circle fill="#007bff" r="2.5" cx="95" cy="52.12311557788944"></circle>
  </svg>
  </div>
  <div className="recovered">
  <span id="tagState">Recovered</span>
  <div id="stateRecover">{this.state.stateRecover}</div>
  <svg width="100" height="75" viewBox="0 0 100 75" preserveAspectRatio="xMidYMid meet">
  <path fill="none" stroke="#28a74599" stroke-width="2.5" d="M5,34.18341708542714C6.5,29.962311557788944,8,25.741206030150753,9.5,25.741206030150753C11,25.741206030150753,12.5,29.610552763819094,14,29.610552763819094C15.5,29.610552763819094,17,10,18.5,10C20,10,21.5,30.84170854271357,23,30.84170854271357C24.5,30.84170854271357,26,26.180904522613062,27.5,25.829145728643216C29,25.47738693467337,30.5,25.301507537688444,32,25.301507537688444C33.5,25.301507537688444,35,28.11557788944723,36.5,28.11557788944723C38,28.11557788944723,39.5,23.806532663316588,41,23.806532663316588C42.5,23.806532663316588,44,24.51005025125628,45.5,24.77386934673367C47,25.037688442211056,48.5,25.02303182579565,50,25.389447236180906C51.5,25.755862646566168,53.00000000000001,26.532663316582916,54.50000000000001,26.97236180904523C56.00000000000001,27.412060301507537,57.5,27.412060301507537,59,28.02763819095477C60.5,28.643216080402006,62,30.035594639865998,63.5,30.665829145728644C65,31.29606365159129,66.5,31.809045226130657,68,31.809045226130657C69.5,31.809045226130657,71,31.398659966499164,72.5,31.017587939698494C74,30.636515912897824,75.5,30.519262981574542,77,29.522613065326635C78.5,28.525963149078727,80,18.61809045226131,81.5,18.61809045226131C83,18.61809045226131,84.5,25.125628140703522,86,25.125628140703522C87.5,25.125628140703522,89,23.103015075376884,90.5,23.103015075376884C92,23.103015075376884,93.5,23.67462311557789,95,24.246231155778897" stroke-dasharray="148.8032989501953" stroke-dashoffset="0"></path>
  <circle fill="#28a745" r="2.5" cx="95" cy="24.246231155778897"></circle>
  </svg>
  </div>
  <div className="death">
  <span id="tagState">Death</span>
  <div id="stateDeath">{this.state.stateDeath}</div>
  <svg width="100" height="75" viewBox="0 0 100 75" preserveAspectRatio="xMidYMid meet">
  <path fill="none" stroke="#6c757d99" stroke-width="2.5" d="M5,44.2964824120603C6.5,44.07663316582914,8,43.85678391959799,9.5,43.85678391959799C11,43.85678391959799,12.5,44.120603015075375,14,44.20854271356784C15.5,44.2964824120603,17,44.38442211055277,18.5,44.38442211055277C20,44.38442211055277,21.5,44.2964824120603,23,44.2964824120603C24.5,44.2964824120603,26,44.47236180904523,27.5,44.47236180904523C29,44.47236180904523,30.5,44.38442211055277,32,44.38442211055277C33.5,44.38442211055277,35,44.47236180904523,36.5,44.47236180904523C38,44.47236180904523,39.5,44.44304857621441,41,44.38442211055277C42.5,44.32579564489113,44,43.68090452261306,45.5,43.68090452261306C47,43.68090452261306,48.5,43.7395309882747,50,43.85678391959799C51.5,43.97403685092127,53.00000000000001,44.824120603015075,54.50000000000001,44.824120603015075C56.00000000000001,44.824120603015075,57.5,44.53098827470687,59,44.47236180904523C60.5,44.41373534338359,62,44.38442211055277,63.5,44.38442211055277C65,44.38442211055277,66.5,44.64824120603015,68,44.64824120603015C69.5,44.64824120603015,71,44.20854271356784,72.5,44.20854271356784C74,44.20854271356784,75.5,44.38442211055277,77,44.38442211055277C78.5,44.38442211055277,80,43.94472361809046,81.5,43.94472361809046C83,43.94472361809046,84.5,44.47236180904523,86,44.47236180904523C87.5,44.47236180904523,89,44.03266331658292,90.5,44.03266331658292C92,44.03266331658292,93.5,44.252512562814076,95,44.47236180904523" stroke-dasharray="90.40802001953125" stroke-dashoffset="0"></path>
  <circle fill="#6c757d" r="2.5" cx="95" cy="44.47236180904523"></circle>
  </svg>

  </div>
  </div>
  <div>
  <canvas id="mycanvas"></canvas>
  </div>
  </div>
  <div className="col-md-6 left-margin" >
  <h3 className="stateWise">State Wise data</h3>
  <table className="table table-bordered table-striped" id="state_table">
  <tr>
  <th>Name</th>
  <th>Confirm</th>
  <th>Active</th>
  <th>Recover</th>
  <th>Death</th>
  </tr>
  <tbody>
  {this.renderTableData()}
  </tbody>

  </table>
  </div>
  </div>
  </div>
  </div>          
  )
  }
  }

  export default DashboardIndex