24/5/24

This is a simple program that displays 1337 on your github profile under your contribution history.

Currently it starts in July of 2023.  At the time of writing it's May of 2024.  Once we get close to July of 2024, it will stop displaying correctly and I'll need to change the dates.  I could probably write a script that could increment each date by some multiple of 7.

You may want to run the script multiple times

For fun each commit includes a random rap stanza that I snarfed from here:
https://github.com/AbhiCodes737/Python_Rap_Generator

The overall idea was taken from here:
https://www.youtube.com/watch?v=2q--gA97caM

With a fair amount of help from chatGPT

-CT



12/6/24

Made the following changes:
1. Removed a couples unnecessary checks in the pushDatesFunction
2. Wrote a function that takes the array of dates and increments them to the closest Monday to six months ago
3. Wrote a function that executes the entire operation a set number of times with a set amount of rest in between

If you have a particularly slow internet connection you may need to increase the argument of the last function from 12 to something higher.

If you want to make sure you always commit to the same dates then I suggest manually setting the newStartsDates variable inside of the generateNewDatesArray function
