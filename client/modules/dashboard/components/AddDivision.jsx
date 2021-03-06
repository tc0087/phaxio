import React from 'react';
import {Link} from 'react-router';
import {browserHistory} from 'react-router';
import { DropdownButton, MenuItem } from 'react-bootstrap';
import Dropdown from 'react-dropdown';
import ValidationDropdown from './ValidationDropdown';

export default class AddDivision extends React.Component {
	constructor(props){
		super(props);
		this.createDivision=this.createDivision.bind(this);
		this._onSelectMethod=this._onSelectMethod.bind(this);
		this._onSelect = this._onSelect.bind(this)
		this.state={
			"cashOnly":"FALSE",
			"onlyRegisteredAccounts":"FALSE",
			"digitsOnly":"FALSE",
			"Alphanumeric":"FALSE",
			"Parent": '',
		    "Division": '',
		    "Hard Validation": [],
		    "Soft Validation": [],
		    "Method": '',
		    "ATON CUID": '',
		    "Fax Number": '',
		    "Follow-Up Call Number": '',
		    "Follow-Up Email": '',
		    "Other Intel": [],
		    Province:'ON',
			sendOptions: [
				{ value: 0, label: 'FAX' },
				{ value: 1, label: 'ATON' },
				{ value: 2, label: 'MAIL' },
			],
			provinces:['NL','PE','NS','NB','QC','ON','MB','SK','AB','BC','YT','NT','NU'],
			selectedMethod:"FAX"
		}
	}

	createDivision(){
		const id = this.state.id;
		const parent = this.refs.parent.value;
		const division = this.refs.division.value;
		const cashOnly = this.state.cashOnly;
		const onlyRegisteredAccounts = this.state.onlyRegisteredAccounts;
		const digitsOnly = this.state.digitsOnly;
		const Alphanumeric = this.state.Alphanumeric;
		const accountNumPattern = this.refs.accountNumPattern.value;
		const AccountNumLength = this.refs.AccountNumLength.value;
		const startsWith = this.refs.startsWith.value;
		const soft_validation = this.refs.soft_validation.value;
		const method = this.state.selectedMethod;
		const fax_aton_number = this.refs.faxATONNum.value;
		const call_number = this.refs.follupNum.value;
		const email = this.refs.follupMail.value;
		const other_intel = this.refs.intel.value;
		const mailAddress = {
			address:this.refs.address.value,
			city:this.refs.city.value,
			province:this.state.Province,
			postalCode:this.refs.postalCode.value
		}
		if(division){
			Meteor.call('insert.division', parent, division, cashOnly,onlyRegisteredAccounts,digitsOnly,Alphanumeric,accountNumPattern,AccountNumLength,startsWith, soft_validation, method,fax_aton_number, call_number, email, other_intel,mailAddress);
			this.props.selectTab('divisions');
		}
		else{
			alert("No Division entered!");
		}
	}

	_onSelect (option) {
	    this.setState({selected: this.state.options[option].label})
	    console.log(this.state.options[option].label);
  	}
  	_onSelectMethod (option) {
	    this.setState({selectedMethod: this.state.sendOptions[option].label})
  	}

	render(){
	return(
		<div className="container">
		<div className="pageTitle center">Add a Division</div>	
	      	<div className="jumbotron centerME"> 
	      	<form>
	      		<div className="form-group col-xs-6 col-md-6">
			        <label className=" dialogueMed inActive control-label">Parent:</label>
			        <input className="form-control foc " ref="parent" id="name" placeholder="BMO"/>
			    </div>
			    <div className="form-group col-xs-6 col-md-6">
			        <label className=" dialogueMed inActive control-label">Division:</label>
			        <input className="form-control foc " ref="division" id="name" placeholder="BMO Branch"/>
			    </div>
				<div className="row">
					<div style={{marginTop:'2%'}} className = "center col-lg-6 col-md-6 col-sm-12 col-xs-12">
					 	 <div className="dialogueMed inActive">Regisitered accounts only:</div>
						 <DropdownButton id="binTest" className="inputs foc "title={this.state.onlyRegisteredAccounts} onSelect={(eventKey:any)=>this.setState({onlyRegisteredAccounts:eventKey})}>						      
						      	<MenuItem eventKey="TRUE">True</MenuItem>
						      	<MenuItem eventKey="FALSE">False</MenuItem>   
					    </DropdownButton>
					</div>
					 <div style={{marginTop:'2%'}} className = "center col-lg-6 col-md-6 col-sm-12 col-xs-12">
					 	 <div className="dialogueMed inActive">In-Cash only:</div>
						 <DropdownButton id="binTest" className="inputs foc "title={this.state.cashOnly} onSelect={(eventKey:any)=>this.setState({cashOnly:eventKey})}>						      
						      	<MenuItem eventKey="TRUE">True</MenuItem>
						      	<MenuItem eventKey="FALSE">False</MenuItem>   
					    </DropdownButton>
					</div>
				</div>
				<div className="row">
					<div style={{marginTop:'2%'}} className = "center col-lg-6 col-md-6 col-sm-12 col-xs-12">
					 	 <div className="dialogueMed inActive">Digits only:</div>
						 <DropdownButton id="binTest" className="inputs foc "title={this.state.digitsOnly} onSelect={(eventKey:any)=>this.setState({digitsOnly:eventKey,Alphanumeric:"FALSE" })}>						      
						      	<MenuItem eventKey="TRUE">True</MenuItem>
						      	<MenuItem eventKey="FALSE">False</MenuItem>   
					    </DropdownButton>
					</div>	
					<div style={{marginTop:'2%'}} className = "center col-lg-6 col-md-6 col-sm-12 col-xs-12">
					 	 <div className="dialogueMed inActive">Alphanumeric:</div>
						 <DropdownButton id="binTest" className="inputs foc "title={this.state.Alphanumeric} onSelect={(eventKey:any)=>this.setState({Alphanumeric:eventKey,digitsOnly:"FALSE" })}>						      
						      	<MenuItem eventKey="TRUE">True</MenuItem>
						      	<MenuItem eventKey="FALSE">False</MenuItem>   
					    </DropdownButton>
					</div>	
				</div>						
				<div style={{marginTop:'2%'}} className="form-group col-lg-6 col-md-6 col-sm-12 col-xs-12">
				        <label className=" dialogueMed inActive control-label">Account # pattern:</label>
				        <input className="form-control foc " ref="accountNumPattern" id="name" placeholder="Enter pattern" />
			    </div>
			    <div style={{marginTop:'2%'}} className="form-group col-lg-6 col-md-6 col-sm-12 col-xs-12">
			        <label className=" dialogueMed inActive control-label">Account # length:</label>
			        <input className="form-control foc " ref="AccountNumLength" id="name" placeholder="Example: 8,10" />
			    </div>
			    <div style={{marginTop:'2%'}} className="form-group col-lg-6 col-md-6 col-sm-12 col-xs-12">
			        <label className=" dialogueMed inActive control-label">Account # starts with:</label>
			        <input className="form-control foc " ref="startsWith" id="name" placeholder="Example: f,F"/>
			    </div>
			    <div style={{marginTop:'2%'}} className="form-group col-lg-6 col-md-6 col-sm-12 col-xs-12">
			        <label className="dialogueMed inActive control-label">Soft Validation:</label>
			        <input className="form-control foc " ref="soft_validation" id="name" placeholder="Use language similar to UI hints"/>
			    </div>
		    	<div className="row">
					<div className="col-lg-3 col-md-3 col-sm-3 col-xs-3" />
					 <div className = "center col-lg-6 col-md-6 col-sm-6 col-xs-6">
					 <div className="dialogueMed inActive">Send Method:</div>
						 <DropdownButton id="hardVal" className="inputs foc "title={this.state.selectedMethod} onSelect={(eventKey:any)=>this._onSelectMethod(eventKey)} >
						      {this.state.sendOptions.map(function(element){
						      	return(<MenuItem eventKey={element.value}>{element.label}</MenuItem>)
						      })}
					    </DropdownButton>
					</div>
				    <div className="col-lg-3 col-md-3 col-sm-3 col-xs-3" />
				</div>
					<div style={{marginTop:'2%'}} className="form-group col-lg-6 col-md-6 col-sm-12 col-xs-12">
				        <label className=" dialogueMed inActive control-label">Fax Number/CUID:</label>
				        <input className="form-control foc " ref="faxATONNum" id="name" placeholder="+18004564567"/>
				    </div>
				    <div style={{marginTop:'2%'}} className="form-group col-lg-6 col-md-6 col-sm-12 col-xs-12">
				        <label className=" dialogueMed inActive control-label">Follow-Up Number:</label>
				        <input className="form-control foc " ref="follupNum" id="name" placeholder="+18004564567"/>
				    </div>
				    <div style={{marginTop:'2%'}} className="form-group col-lg-6 col-md-6 col-sm-12 col-xs-12">
				        <label className=" dialogueMed inActive control-label">Follow-Up Email:</label>
				        <input className="form-control foc " ref="follupMail" id="name" placeholder="person@company.com"/>
				    </div>
				    <div style={{marginTop:'2%'}} className="form-group col-lg-6 col-md-6 col-sm-12 col-xs-12">
				        <label className=" dialogueMed inActive control-label">Other Intel:</label>
				        <input className="form-control foc " ref="intel" id="name" placeholder="Other"/>
				    </div>
				    <div style={{marginTop:'2%'}} className="form-group col-xs-12 col-md-12 center">
				        <label className=" dialogueMed inActive control-label">Mailing Information</label>
				    </div>
				    <div style={{marginTop:'2%'}} className="form-group col-lg-6 col-md-6 col-sm-12 col-xs-12">
				        <label className=" dialogueMed inActive control-label">Address:</label>
				        <input className="form-control foc " ref="address" id="name" placeholder="123 Fake St."/>
				    </div>
				    <div style={{marginTop:'2%'}} className="form-group ccol-lg-6 col-md-6 col-sm-12 col-xs-12">
				        <label className=" dialogueMed inActive control-label">City:</label>
				        <input className="form-control foc " ref="city" id="name" placeholder="Toronto"/>
				    </div>
				    <div style={{marginTop:'2%'}} className="form-group col-lg-6 col-md-6 col-sm-12 col-xs-12">
				        <label className=" dialogueMed inActive control-label">Province:</label>
				        <DropdownButton id="hardVal" className="form-control inputs foc "title={this.state.Province} onSelect={(eventKey:any)=>this.setState({Province:eventKey})} >
						      {this.state.provinces.map(function(element){
						      	return(<MenuItem eventKey={element}>{element}</MenuItem>)
						      })}
					    </DropdownButton>
				    </div>
				    <div style={{marginTop:'2%'}} className="form-group col-lg-6 col-md-6 col-sm-12 col-xs-12">
				        <label className=" dialogueMed inActive control-label">Postal Code:</label>
				        <input className="form-control foc " ref="postalCode" id="postalCode" placeholder="L6M 1C3"/>
				    </div>
			    </form>
				<div className = "row">
		          <div className = "col-lg-5 col-md-5 col-sm-4 col-xs-4"></div>
		          <button
		            className= "foc center inputs send btn btn-default col-lg-2 col-md-2 col-sm-4 col-xs-4"
		            style={{

		              boxShadow:'none',
		              borderRadius:'4px',
		            }}
		            onClick={this.createDivision}
		            >Add Division
		          </button>
		          <div className = "col-lg-5 col-md-5 col-sm-4 col-xs-4"></div>
		        </div>
	    	</div>
	    </div>
		)
	}
}
