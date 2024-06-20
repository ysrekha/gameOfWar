//tests

import { expect }  from 'chai'; // Importing expect from Chai assertion library
import { describe, it } from 'mocha'; // Importing describe and it from Mocha test framework
import { Deck} from './gameOfWar.js'; // Importing class Deck from ./gameOfFiles.js file

// Mocha test suite using describe()
describe('deal', () => { 
    const deck = new Deck(); // Create a new instance of Deck
    const numCardsToDeal = 10; // Specify the number of cards to deal
    const hand = deck.deal(numCardsToDeal); // Deal cards from the deck
    // Mocha test case using it()
    it(`should deal the specified number of cards`, () =>{ 
        expect(hand).to.have.lengthOf(numCardsToDeal); // Assertion using Chai's expect() to check the length of the dealt hand
    });
    it(`should have the remaining cards in the deck after dealing`,()=> {
        expect(deck.cards).to.have.lengthOf(52 - numCardsToDeal); // Assertion using Chai's expect() to check the remaining cards in the deck
    })
});

