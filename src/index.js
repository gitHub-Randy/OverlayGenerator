'use strict'

import TestClass, { testClass  } from "./testClass";
import InputChecker from "./inputChecker";

let t = new TestClass("HEllovdgdsg Word");

let inputChecker = new InputChecker();
inputChecker.positionIsValid('./testVideo.mp4', './testImage.png');