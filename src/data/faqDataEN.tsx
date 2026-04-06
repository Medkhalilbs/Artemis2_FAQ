import React from "react";

export const basesItemsEN = [
  {
    question: "What exactly is \"Artemis 2\"?",
    answer: "It is the first crewed mission of the Artemis program. Following the success of Artemis 1 (an uncrewed test flight in 2022), this mission will send four astronauts to fly around the Moon.",
  },
  {
    question: "Why is it called \"Artemis\" and what is the link with the \"Apollo\" missions?",
    answer: "In Greek mythology, Artemis is the twin sister of Apollo and the goddess of the Moon. This name symbolizes humanity's return to the Moon with a modern and inclusive approach.",
  },
  {
    question: "What is the main goal of this journey?",
    answer: "The objective is to test all the life support systems of the Orion capsule with humans on board. It acts as a dress rehearsal to ensure everything works perfectly before attempting a landing on the following mission.",
  },
  {
    question: "Will the astronauts walk on the Moon this time?",
    answer: "No. They will fly over the far side of the Moon and return to Earth. The landing (walking on the lunar soil) is currently planned for the Artemis 4 mission, scheduled for a few years later. (Subject to changes, the program is heavily revised from month to month)",
  },
  {
    question: "Why simply fly around the Moon instead of landing directly?",
    answer: "It is a matter of safety. Before risking a complex landing, NASA wants to verify that the Orion spacecraft is capable of keeping a crew alive in deep space and returning safely.",
  },
  {
    question: "What happens if there is an engine failure behind the Moon?",
    answer: "The trajectory of Artemis 2 is called a \"free-return trajectory\". This means the Moon's gravity will naturally guide the capsule back to Earth, even if the main engine fails.",
  },
  {
    question: "Why does the speed decrease on the way to the Moon?",
    answer: "The spacecraft is pulled by Earth's gravity, gradually slowing down until it gets close enough to the Moon for lunar gravity to pull harder than Earth's: the spacecraft will then accelerate again, pass behind the Moon, and undergo the reverse phenomenon on the way back.",
  },
  {
    question: "Will Artemis 2 break the human distance record set by Apollo 13? By how much?",
    answer: "Yes! The record will be broken either way, but we don't know exactly by how much. It will be established with certainty after the third and final trajectory correction maneuver before reaching the Moon.",
  },
  {
    question: "Why don't they just fire the engine to get there faster?",
    answer: "While a faster trip is possible, it would consume more fuel and require braking upon arrival, which would be dangerous if an engine problem occurred. In any case, if they chose to go faster, they would only have made a stronger initial burn. Subsequent burns would inherently be less efficient.",
  },
  {
    question: "What are the biggest risks of the mission? Is it possible for things to go wrong?",
    answer: "The biggest risk was liftoff, and it went perfectly! Regarding problems they might encounter, all spacecraft systems are redundant (double or even triple), mitigating any technical flaw. It's thanks to this that the Apollo 13 crew returned safely! In addition to redundancy, the spacecraft is on a free-return trajectory: even if all engines fail, it will return to Earth. Lastly, the final critical phase: atmospheric reentry. The spacecraft will be protected by a heat shield, then descent will be handled by parachutes, resulting in a splashdown in the Pacific Ocean.",
  },
  {
    question: "The Apollo missions took a day less to reach the Moon. Why is this modern capsule \"slower\"?",
    answer: "The trip duration (optimized for fuel efficiency) is determined by the laws of celestial mechanics. Travel times are roughly the same. However, Artemis 2 began by orbiting Earth for 24 hours to (among other things) ensure all critical systems were operational before initiating the 10-day trip to the Moon and back.",
  },
  {
    question: "Is the Van Allen radiation belt dangerous for astronauts?",
    answer: "If crossed directly, there is a risk of radiation exposure. However, there is no risk for ISS astronauts, who fly much lower. For Artemis astronauts, there is also no danger, as the trajectory bypasses it—it is a belt, not a full sphere around Earth.",
  },
  {
    question: "Will they bring back lunar rocks?",
    answer: "No, because they are not landing. However, they will take thousands of high-resolution photos and videos to help scientists study the lunar surface.",
  },
  {
    question: "What problems have been encountered since the start of the mission?",
    answer: (
      <div className="space-y-2">
        <p>No major issues have occurred since the start of the mission. Overall, the European service module is of very high quality according to NASA (better than expected). A few minor hitches have been noted:</p>
        <ul className="list-disc list-inside space-y-1 text-muted-foreground">
          <li>After liftoff on April 2nd, when opening the water cylinders, the main valve did not open. This problem was resolved remotely by Houston resetting the opening valve. Just in case, the astronauts filled water pouches.</li>
          <li>The toilet exhaust didn't work immediately because the exhaust nozzle was clogged by crystallizing ejecta. The exhaust area was turned towards the sun, which cleared the nozzle.</li>
          <li>There was a slight burning smell in the capsule, which was only due to a surplus of hydrogen.</li>
          <li>The humidity inside the capsule was not stabilized; the astronauts used wet towels to compensate for the lack of humidity.</li>
        </ul>
      </div>
    ),
  },
  {
    question: "Which agencies are involved in the mission?",
    answer: (
      <div className="space-y-2">
        <p>The astronauts are from NASA (USA) and CSA (Canada). Although the program is administered by NASA, other agencies are involved such as CSA and ESA. Various external contractors developed parts of the spacecraft: Lockheed Martin (capsule), Airbus (service module), Boeing (first stage).</p>
        <p>Blue Origin and SpaceX are contracted for a lunar lander (still in the design stage, 5 years behind schedule) for a future mission, but they have no equipment on Artemis 2.</p>
      </div>
    ),
  },
  {
    question: "Can we see Artemis from Earth?",
    answer: "No, not even with a telescope.",
  },
  {
    question: "Why are their suits orange?",
    answer: "So they can be easily spotted when they splash down in the water. They also have small life buoys for safety and can activate personal life rafts. We saw them entering the Orion capsule before liftoff.\nThis suit is only used for critical moments.",
  },
  {
    question: "Why didn't the capsule aim for the Moon right from the start?",
    answer: (
      <div className="space-y-2">
        <p>There are several reasons. Since this is a test mission, the first step was to complete two orbits around Earth: a first at \"low\" altitude, and a second climbing up to 70,000 km after an initial burn. This helped build speed and gave them a day to run tests before leaving for the Moon. Trans-lunar injection was executed when the spacecraft hit the lowest point of this second orbit, where acceleration is most efficient (Oberth effect).</p>
        <p>But even during this burn, the spacecraft wasn't pointing straight at the Moon! Why? Because in orbital mechanics, accelerating modifies the trajectory on the opposite side of the orbit; also, you must ensure the arrival point is not where the moon is *now*, but where it will be upon arrival!</p>
      </div>
    ),
  },
  {
    question: "How does the capsule locate itself?",
    answer: (
      <ul className="list-disc list-inside space-y-1 text-muted-foreground">
        <li>It is equipped with an inertial measurement unit (IMU). These sensors measure acceleration in all directions, determining location based on a known starting point.</li>
        <li>Via GPS: but at this distance, accuracy isn't great. However, pinpoint accuracy isn't as critical as it is on Earth.</li>
        <li>Via... math! Orbital mechanics are extremely well-mastered, providing exact positions by using math over speed and time data.</li>
      </ul>
    ),
  },
  {
    question: "How will the communications blackout with Orion play out?",
    answer: "When Orion passes behind the Moon, the capsule will be cut off from Houston because the Moon will be between it and Earth. Since communications happen via radio waves, a line of sight is necessary. There will be roughly 40 minutes to an hour of blackout.",
  },
  {
    question: "Why are the solar arrays mobile?",
    answer: (
      <div className="space-y-2">
        <p>The panels are mobile on the capsule for 2 main reasons:</p>
        <ul className="list-disc list-inside space-y-1 text-muted-foreground">
          <li>To orient themselves optimally to capture maximum sunlight and generate more electrical energy to sustain the capsule.</li>
          <li>To allow the panels to fold against the service module during engine burns, reducing the mechanical stress they must endure.</li>
        </ul>
        <p>This mobility also allowed for an astronaut selfie by pointing the boom-mounted cameras towards the capsule.</p>
      </div>
    ),
  },
  {
    question: "Do the astronauts feel changes in speed?",
    answer: "Only during engine burns. The rest of the time, the spacecraft and the astronauts are in freefall in exactly the same way. They are therefore in zero gravity at all times and feel no force, even when the trajectory is curved. During a burn, a force is applied and the spacecraft is no longer in freefall: the astronauts can thus feel this force. Apart from liftoff and atmospheric reentry (where the capsule is severely decelerated by the atmosphere), the forces are not very intense. The astronauts are therefore not crushed into their seats during maneuvers in space.",
  },
  {
    question: "How does the capsule orient itself in space without air?",
    answer: "The capsule orients, accelerates, and decelerates using its thrusters. Creating a 'thrust' does not require air—this is a common misconception propagated by non-specialized media. The gas jets produced by the engines create, under the effect of expelling the gas, a reaction where the capsule moves in the opposite direction. It is simply the principle of Action/Reaction (in other words, Newton's 3rd Law).",
  },
];

export const vieABordItemsEN: { question: string; answer: string | React.ReactNode }[] = [
  {
    question: "How do they eat, sleep, and wash?",
    answer: "They eat freeze-dried or vacuum-sealed foods. To sleep, they strap themselves into sleeping bags so they don't float around. For hygiene, they use wet wipes and no-rinse shampoo since water doesn't flow in zero gravity.",
  },
  {
    question: "How big is the capsule?",
    answer: (
      <div className="space-y-2">
        <p>Two measurements must be distinguished:</p>
        <p>The <strong className="text-foreground/80">total pressurized interior volume</strong> is about 20 m³, but it's largely filled by seats, screens, and equipment.</p>
        <p>The <strong className="text-foreground/80">habitable volume</strong> (free space to move) is only 9 m³. That's equivalent to a small bathroom for four adults living 24/7 for 10 days. The astronauts being in zero gravity makes this a comfortable volume given the constraints of spaceflight.</p>
      </div>
    ),
  },
  {
    question: "What is the temperature on board?",
    answer: "Temperature is adjustable; the crew currently prefers 24/25°C (75-77°F).",
  },
  {
    question: "How do they use the bathroom?",
    answer: "They use a special space toilet. Liquids are regularly ejected into space (visible on the livestream!), while solid waste is stored to be evacuated upon returning to Earth.",
  },
  {
    question: "Do they all sleep at the same time?",
    answer: "Yes, this is normal. Never in history has a crew \"taken shifts\" on board. Houston controllers monitor them and the capsule 24/7 and can remotely pilot if necessary.",
  },
  {
    question: "What sleep cycle are the astronauts on?",
    answer: (
      <div className="space-y-2">
        <p>Since the mission is run by NASA, the astronauts follow American time. They sleep at the same time while Houston keeps watch.</p>
        <p>When it's time to wake up, Houston traditionally plays a song over the radio. For their first wake-up, the song was <em>\"Green Light\"</em> by John Legend — fitting since that was the day they got the \"green light\" for the trans-lunar injection burn.</p>
      </div>
    ),
  },
  {
    question: "How do the astronauts move or stretch?",
    answer: "For Artemis, there is a sort of rowing machine that the astronauts use to exercise 30 minutes a day. On the ISS, they exercise 2.5 hours a day by comparison.",
  },
  {
    question: "Why are the seats not visible?",
    answer: "The astronaut seats inside the capsule, as well as the command screens, are foldable. This gives the astronauts more space to move around when they don't need to be seated or strapped in.",
  },
  {
    question: "Why are the spacesuits orange? Why aren't they worn all the time?",
    answer: "The suits are used to temporarily protect the astronauts from decompression during launch and splashdown. Therefore, they are not typically worn in orbit. The orange color makes it easier for recovery teams to spot the astronauts in the ocean at the end of the mission, or in the case of a launch abort.",
  },
  {
    question: "How do astronauts use the bathroom while in their suits?",
    answer: "While wearing their spacesuits, the astronauts wear adult diapers.",
  },
];

export const imagesItemsEN: { question: string; answer: string | React.ReactNode }[] = [
  {
    question: "Why is nothing happening on the livestream right now?",
    answer: "Space takes a lot of time, and the distances are enormous. The mission's focus is executing checklists, scientific objectives, and resting. Movies make things look instantaneous, but reality is slower for safety reasons. Enjoy the quiet downtime and the beautiful views.",
  },
  {
    question: "Why can't I see any stars?",
    answer: "The Sun illuminates what the camera is filming. Just like it's impossible to film stars at night while standing under a streetlight, the Orion camera \"cannot see\" the stars due to exposure limits.",
  },
  {
    question: "Why sometimes we neither see the Earth nor the Moon?",
    answer: "Space is huge and pitch black. If the camera isn't pointed exactly at Earth or the Moon, you only see the void. It's like being at sea at night: if you don't point your flashlight at a boat or the coast, everything is black.",
  },
  {
    question: "Why does the picture tremble?",
    answer: "The camera is attached to the tip of a solar panel and is sensitive to the residual movements of astronauts inside the capsule.",
  },
  {
    question: "Why doesn't the capsule always point forward?",
    answer: "Since the journey happens with the engine off and there's no air drag, the capsule can face any orientation. It is frequently re-oriented to film different things or manage thermal exposure to the Sun.",
  },
  {
    question: "Why does it look like we are not moving?",
    answer: "Because the capsule is very far away from everything! Like looking at the horizon on an ocean liner, you can't feel the movement without references.",
  },
  {
    question: "Is it a picture or a livestream?",
    answer: "It is a live video feed broadcast by NASA. However, communication drops or freezes occur normally.",
  },
  {
    question: "Why aren't there more beautiful pictures of Earth/Moon?",
    answer: "NASA selectively curates the images it broadcasts. However, all images and videos taken during the mission are recorded in 4K on board the capsule and will certainly be released publicly post-mission.",
  },
  {
    question: "Why do pictures take time to reach us?",
    answer: "The capsule is far from Earth. Even at lightspeed, radio signals take over a second to arrive. Transferring large HD video files can take minutes. Bandwidth priority goes to vital data: comms and the thousands of sensor readings.",
  },
  {
    question: "Who is filming the capsule from the outside?",
    answer: "It is a camera placed at the end of a solar array on the European service module. As it is a wide-angle camera, the edges appear distorted.",
  },
  {
    question: "Why is the screen blue?",
    answer: "A blue screen indicates a loss of video communication. This is normal behavior: priority is given to critical telemetry data over video feeds.",
  },
  {
    question: "How many cameras are there in total?",
    answer: "32 optical devices in total, including 15 fixed on the spacecraft and 17 handheld cameras used by the crew.",
  },
  {
    question: "What handheld cameras do the crew use?",
    answer: (
      <div className="space-y-2">
        <p>Two <strong className="text-foreground/80">Nikon D5</strong> professional DSLRs equipped with wide and telephoto lenses. Chosen for their high dynamic range and radiation resistance.</p>
        <p>A <strong className="text-foreground/80">Nikon Z9</strong> mirrorless camera — a first in space.</p>
        <p>Portable <strong className="text-foreground/80">GoPros</strong> operated for a National Geographic documentary. Their footage won't be streamed live but brought back post-splashdown.</p>
      </div>
    ),
  },
  {
    question: "What are the fixed exterior cameras?",
    answer: "Modified GoPros are mounted on the exterior, primarily on solar panels, to film the craft, Earth, and Moon. Other cameras monitor critical phases like solar array deployment and module separation.",
  },
  {
    question: "How are the images transmitted to Earth?",
    answer: "The O2O (Orion Artemis II Optical Communications System) laser communication system transmits 4K videos at speeds up to 260 megabits per second.",
  },
  {
    question: "Why is there white noise when no one is talking?",
    answer: "White noise arises during intervals between astronaut and Mission Control communications.",
  },
  {
    question: "Who is talking on the radio?",
    answer: "You hear communications between the astronauts and CAPCOM (in Houston). Typically, it's Jenni Gibbons speaking to the astronauts from the ground.",
  },
  {
    question: "Why do they say \"Copy\" in transmissions?",
    answer: "\"Copy\" simply means \"message received/understood\".",
  },
  {
    question: "Why are the distances in Miles?",
    answer: (
      <div className="space-y-2">
        <p>Since the data comes from NASA (an American agency), details are communicated using the Imperial system. Sometimes pressure is given in psi.</p>
        <p className="font-mono text-xs bg-secondary/50 p-2 rounded">1 mile = 1.609 km · 1 bar = 14.5 psi = pressure at sea level</p>
      </div>
    ),
  },
  {
    question: "Why do they say \"Houston\"?",
    answer: "Because the main control center, the \"Lyndon B. Johnson Space Center\", is located in Houston, Texas. This is where CAPCOM and flight directors operate from.",
  },
  {
    question: "Why are some pictures of Earth much darker than Apollo pictures?",
    answer: (
      <div className="space-y-2">
        <p>Due to current celestial positioning, the beginning of the journey took place in Earth's shadow. The face of Earth visible to the crew is the \"night\" side!</p>
        <p>Yes, it's surprising, but these are night-time pictures with the Sun behind the Earth. Several things allow us to see our planet on these shots: high exposure time, very high ISO (causing artifacts), and crucially... a light source. But which one, since the Sun is behind the Earth? Well... The Full Moon! It reflects sunlight perfectly to illuminate Earth for these shots.</p>
        <p>Hence, you can actually see the auroras at both poles, the atmosphere glowing on the edges, stars, and... public city lights since it's night time!</p>
      </div>
    ),
  },
  {
    question: "What is this ghostly sun?",
    answer: "A light source like the sun or the moon causes a reflection on the camera sensor in the form of a halo or a luminous circle.",
  },
  {
    question: "Why does the Moon look smaller in space than from Earth?",
    answer: "It's an optical illusion. The Moon appears larger on Earth when seen 'close' to reference points like trees or houses. It can also be influenced by camera zoom effects.",
  },
  {
    question: "Will the crew be able to photograph the American flags and modules?",
    answer: (
      <div className="space-y-2">
        <p>No, for several reasons. Primarily, they won't pass over them: all Apollo missions landed on the near side of the Moon, while the flyby happens over the far side.</p>
        <p>Even if they flew over, they would be too far away and the left-behind Apollo gear is too small.</p>
        <p>However, the Lunar Reconnaissance Orbiter has completed detailed mapping of the Moon; when zooming in on Apollo landing sites, you can actually spot the descent stage of the LEM left behind, along with its shadow!</p>
      </div>
    ),
  },
];

export const diversItemsEN: { question: string; answer: string | React.ReactNode }[] = [
  {
    question: "What is the plush toy we see from time to time?",
    answer: "This plush toy is named Rise, and it serves as the mission's mascot and zero-gravity indicator. It represents the famous Earthrise photo taken during the Apollo 8 mission: the Moon wearing a cap depicting Earth. Furthermore, inside it is an SD card containing the names of over 5 million people who signed up following a NASA initiative. Vincent and Kibo have their names on board! We can also spot another plush toy behind Jenni Gibbons, the astronaut communicating with the crew from CAPCOM. It's Artemis, a character from the animated series Sailor Moon!",
  },
  {
    question: "Is space political?",
    answer: "Yes, and it always has been. The space race was a way to prove technological supremacy during the Cold War. Today, Artemis remains highly political, involving many stakeholders and enormous budgets approved by policymakers.",
  },
  {
    question: "Which watch is issued to the Artemis 2 crew?",
    answer: "Each crew member carries an Omega Speedmaster X-33.",
  },
  {
    question: "Who will be the next European astronaut to fly on Artemis?",
    answer: (
      <div className="space-y-2">
        <p>Spaceflight runs on a barter system between agencies. In exchange for hardware, agency astronauts fly on missions. ESA would come in third priority behind Canadians and Japanese. Within ESA, Germans will likely be prioritized as they are the biggest contributors.</p>
        <p>A European astronaut flight wouldn't happen until Artemis IV at the earliest. Thomas Pesquet is in "retraining", so he likely won't be an astronaut by the time these missions occur. The same applies to Sophie Adenot.</p>
        <p>However, you can rejoice just as much if a non-French European is selected, because your taxes pay the salaries of all European astronauts, and they represent all of you.</p>
      </div>
    )
  },
  {
    question: "Do rockets pollute a lot?",
    answer: "The SLS rocket uses a core stage powered by hydrogen + oxygen, which primarily emits water vapor (clouds). Once they fall back into the ocean, the boosters and stages become inert and form excellent foundations for reef development, much like shipwrecks. The Kennedy Space Center is also very careful to disturb the local ecosystem as little as possible. However, this isn't true for all rockets, as some use kerosene (e.g., SpaceX's Falcon 9). Energy consumption and pollution due to the production of the rocket and its fuel remain frequent points of criticism.",
  }
];
