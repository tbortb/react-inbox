import reducer from './FakeReducer';
import deepFreeze from 'deep-freeze';
import {MESSAGES_REQUEST_SUCCESS, MESSAGES_REQUEST_STARTED} from '../Actions/loadMessages'

describe("test fake reducer", () => {
    
    it("handle MESSAGES_REQUEST_SUCCESS", () => {
        const currentState = {
            messages: [{subject: "Batman called you",
            read: false,
            starred:true,
            selected: true,
            labels: [],
            body: "Haha got ya",
            id: 2}],
            isLoading: true
        };
        deepFreeze(currentState);
        
        const testAction = {
            type: MESSAGES_REQUEST_SUCCESS,
            messages: [{subject: "Batman called you again",
            read: false,
            starred: true,
            selected: true,
            labels: [],
            body: "This time it was for real",
            id: 3}]
        }
        
        const expectedState = {
            messages: [{subject: "Batman called you again",
            read: false,
            starred: true,
            selected: true,
            labels: [],
            body: "This time it was for real",
            id: 3}],
            isLoading: false
        }
        
        expect(reducer(currentState, testAction)).toEqual(expectedState);
    })
    
    it("handle MESSAGES_REQUEST_STARTED", () => {
        
        const currentState = {
            messages: [{subject: "Batman called you",
            read: false,
            starred:true,
            selected: true,
            labels: [],
            body: "Haha got ya",
            id: 2}],
            isLoading: false
        };
        deepFreeze(currentState);

        const testAction = {
            type: MESSAGES_REQUEST_STARTED
        }
        
        const expectedState = {
            messages: [{subject: "Batman called you",
            read: false,
            starred:true,
            selected: true,
            labels: [],
            body: "Haha got ya",
            id: 2}],
            isLoading: true
          }

        expect(reducer(currentState, testAction)).toEqual(expectedState);
    })
})