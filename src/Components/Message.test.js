import React from 'react';
import { shallow } from 'enzyme';
import Message from './Message';

describe("Test message component", () => {
    
    it("is update function triggered by star", () => {
        const spy = jest.fn();
        const wrapper = shallow(<Message updateItem={spy} message={{id: 1, labels: [], starred: false}}/>);
        wrapper.find("i.star").simulate("click", {target: {dataset: {attribute: "starred"}}});
        expect(spy.mock.calls.length).toBe(1);
    })
    
    it("starred works", () => {
        const wrapper = shallow(<Message message={{id: 1, labels: [], starred: true}}/>);
        expect(wrapper.find("i.fa-star-o").length).toBe(0);
    })
    
    it("non starred works", () => {
        const wrapper = shallow(<Message message={{id: 1, labels: [], starred: false}}/>);
        expect(wrapper.find("i.fa-star-o").length).toBe(1);
    })
    
})