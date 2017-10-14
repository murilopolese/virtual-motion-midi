# Virtual Motion MIDI

![](https://i.imgur.com/3PbUzvx.png)

## TL;DR How do I make it work?
0. Download the the right app for your OS on the [releases page](https://github.com/murilopolese/virtual-motion-midi/releases).
1. Plug your motion sensor on your computer
2. Open Virtual Motion MIDI
3. Open your favourite DAW
4. Go to the MIDI settings on your DAW and configure the Virtual Input and Virtual Output as you prefer.
5. Create a MIDI channel with a clip containing a groove. It doesn't matter which notes your are sending. Send this MIDI notes to the Virtual Input.
6. Create another MIDI channel with an instrument that will receive the notes from Virtual Output on channel 1.
7. You have to send MIDI notes to the Virtual Input if you want notes out of the Virtual Output. Therefore, you should press play.
8. Set linear values if you want to quantise it on your DAW or use [this table](http://newt.phys.unsw.edu.au/jw/notes.html) and crack down MIDI note numbers.

## What is this for?

Send MIDI notes to other software or hardware using the Kano's Motion Sensor and your favourite DAW.

## What is this not for?

Doing anything else than said above.

## How does it work?

Virtual Motion MIDI creates a virtual MIDI device with an input and an output. When you send MIDI note messages to it's Virtual Input, the note value sent will be replaced by the note your adorable ASCII art hand will hovers. This MIDI message will go out through the Virtual Output as note with length of 10ms.

From now on, using your favourite DAW you can change the note length, quantise or use any of the infinite possibilities you have to paint landscapes on the blank canvas of your sonic imagination.

## What are the numbers I should input?

Those are MIDI note values. They go from 0 to 127 and you can check [this table](http://newt.phys.unsw.edu.au/jw/notes.html) to understand what is the number for the notes you want.

Another way to do it is to set values increasing 1 by 1, for example "0, 1, 2, 3" and from the DAW, pitch shift and quantise it as you prefer. This way you can forget about this poorly made software and lick the well designed corners of your favourite DAW interface.
