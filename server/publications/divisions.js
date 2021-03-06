import {Divisions} from '/lib/collections';
import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';

export default function () { 
	
	Meteor.publish('divisions.list', function () {
		return Divisions.find();
	});

	Meteor.publish('faxable.divisions', function () {
		return Divisions.find({'Method': 'FAX'});
	});
	
}