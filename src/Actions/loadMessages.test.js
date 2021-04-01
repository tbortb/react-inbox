import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import fetchMock from 'fetch-mock'
import { MESSAGES_REQUEST_SUCCESS, MESSAGES_REQUEST_STARTED, fetchMessages } from '../Actions/loadMessages'


const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe("Test the loadMessages action", () => {

    afterEach(() => {
        fetchMock.restore()
    })

    it("fetch messages from api and hand them to the store", async () => {

        const mockOutput = {messages: [{
            subject: "Batman called you",
            read: false,
            starred: true,
            selected: true,
            labels: [],
            body: "Haha got ya",
            id: 2
        },
        {
            subject: "Batman called you again",
            read: false,
            starred: true,
            selected: true,
            labels: [],
            body: "This time it was for real",
            id: 3
        }]};

        fetchMock.get("/messages", mockOutput);

        const expectedActions = [
            { type: MESSAGES_REQUEST_STARTED },
            { type: MESSAGES_REQUEST_SUCCESS, messages: mockOutput.messages }
        ]

        const store = mockStore({ messages: [] })

        await store.dispatch(fetchMessages())

        expect(store.getActions()).toEqual(expectedActions)
    })
})