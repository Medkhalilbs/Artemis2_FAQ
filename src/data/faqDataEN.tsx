import React from "react";

export const basesItemsEN = [
  {
    question: "What exactly is \"Artemis 2\"?",
    answer: "It is the first crewed mission of the Artemis program. Following the success of Artemis 1 (an uncrewed test flight in 2022), this mission will send four astronauts to fly around the Moon.",
  },
  {
    question: "Are Artemis I and Artemis II the same trajectory, just with humans inside?",
    answer: "The trajectories are different because Artemis I orbited the Moon before returning to Earth, whereas Artemis II is a simple flyby of the Moon followed by an immediate return to Earth.",
  },
  {
    question: "Why is it called \"Artemis\" and what is the link with the \"Apollo\" missions of the 60s?",
    answer: "In Greek mythology, Artemis is the twin sister of Apollo and the goddess of the Moon. This name symbolizes humanity's return to the Moon with a modern and inclusive approach.",
  },
  {
    question: "What exactly are Artemis, Orion, and Integrity?",
    answer: "Artemis is the name of the program, and Artemis II is the name of this specific mission. Orion is the name of the spacecraft model (like a ship model), and Integrity is the name the crew gave to their own spacecraft.",
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
    question: "How much does the Artemis program cost?",
    answer: "To answer this, one must distinguish hardware costs (rocket, suits, fuel) from related costs like personnel. The NASA Office of Inspector General currently estimates the total program cost at just over $90 billion through late 2025. To give you an idea, a single rocket (capsule + launcher) costs $2 to $2.5 billion to manufacture, plus about $1.5 billion to conduct the mission itself, totaling roughly $4 billion per launch. Remember, this is a long-term project and NASA's budget is less than 1% of US federal spending, compared to over 4% during the Apollo era.",
  },
  {
    question: "What happens if there is an engine failure behind the Moon?",
    answer: "The trajectory of Artemis 2 is called a \"free-return trajectory\". This means the Moon's gravity will naturally guide the capsule back to Earth, even if the main engine fails.",
  },
  {
    question: "Why does the speed decrease on the way to the Moon?",
    answer: "The spacecraft is pulled by Earth's gravity, gradually slowing down until it gets close enough to the Moon for lunar gravity to pull harder than Earth's. Note: NASA telemetry usually gives speed relative to Earth, not the Moon, so you might not see an increase in speed on the dashboard even as the spacecraft technically accelerates toward the Moon.",
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
    answer: "No, not even with a telescope. Or at least no more than a few pixels, and only when the spacecraft is close enough to Earth and illuminated by the sun. And with a very good telescope.",
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
  {
    question: "Is there a risk the Orion spacecraft could be damaged by meteorites?",
    answer: (
      <div className="space-y-2">
        <p>Yes, a risk exists, but it is low and well managed.</p>
        <p>The Orion spacecraft is designed with multi-layer protective shields capable of absorbing or dispersing the energy of impacts. Large meteorites are extremely rare, and agencies like NASA continuously monitor the space environment to avoid dangerous trajectories.</p>
      </div>
    ),
  },
  {
    question: "How is the capsule's temperature managed compared to Apollo? Is there a 'Barbecue Mode' for Artemis II?",
    answer: "During Apollo missions, astronauts used a maneuver called the 'Barbecue Roll' (or Passive Thermal Control). The spacecraft slowly rotated on its axis to evenly distribute solar heat across its surface, preventing one side from overheating while the other froze. For Artemis II, the Orion capsule does not use this continuous rotation mode. It features a far more modern thermal control system combining advanced insulation, thermal fluid circulation, and radiators. However, Orion can still perform orientation adjustments if needed to optimize solar exposure and maintain a stable temperature on board.",
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
        <p>In comparison, for Apollo missions, total pressurized volume was 10.4 m³, for 5.9 m³ habitable. Artemis has twice the total volume and 12.5% more space per astronaut!</p>
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
    question: "Why is it dark in the capsule?",
    answer: "When astronauts perform scientific observations, the lights are dimmed to allow their eyes to adjust and to prevent reflections from polluting the data. They use red/green utility lights to find their way around, similar to military craft.",
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
    question: "What is the day/night boundary on a celestial body called? What is the Terminator?",
    answer: "The terminator is the moving line between the lit and dark sides of a planet or moon — unfortunately nothing to do with the movies. You can see it on Earth by looking at the night side and watching the shadow of night slowly progress.",
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
    answer: "Yes, and it always has been. From the Cold War to today, space remains highly political. Recent administrative changes and funding debates impact NASA's direction constantly. For example, the current NASA administrator was appointed recently under a new political climate.",
  },
  {
    question: "Which watch is issued to the Artemis 2 crew?",
    answer: "Each crew member carries an Omega Speedmaster X-33.",
  },
  {
    question: "Who will be the next European astronaut to fly on Artemis?",
    answer: (
      <div className="space-y-2">
        <p>Spaceflight runs on a barter system between agencies. In exchange for hardware (like the Service Module), agency astronauts fly on missions. ESA would come in after Canadians and Japanese. Within ESA, major contributors like Germany or France often have engineers/astronauts prioritized.</p>
        <p>A European astronaut flight likely won't happen until Artemis IV at the earliest. Famous astronauts like Thomas Pesquet or Sophie Adenot are in the selection pool but mission assignments are not yet fixed.</p>
      </div>
    )
  },
  {
    question: "Do rockets pollute a lot?",
    answer: "The SLS rocket core stage uses hydrogen + oxygen, emitting primarily water vapor. Boosters fall into the ocean and often form foundations for reefs. While production and toxic fuel in some components are concerns, modern space programs are increasingly attentive to environmental impact.",
  },
  {
    question: "What are the astronauts' Wake-Up Songs?",
    answer: (
      <div className="space-y-2">
        <p>Details from the Artemis Tracker (artemis.cdnspace.ca):</p>
        <ul className="list-none space-y-2 text-muted-foreground">
          <li><strong>FD09 - Lonesome Drifter (Charley Crockett):</strong> Another drifting theme as Orion continues its long coast back to Earth.</li>
          <li><strong>FD08 - Under Pressure (Queen &amp; David Bowie, 1981):</strong> Requested by Jeremy Hansen - A nod to the cabin depressurization and repressurization test scheduled for the day. Accompanied by a special message from the Canadian Space Agency.</li>
          <li><strong>FD07 - Tokyo Drifting (Denzel Curry &amp; Glass Animals, 2020):</strong> Requested by Reid Wiseman - A fitting choice as the crew drifted away from the Moon on the return leg.</li>
          <li><strong>FD06 - Good Morning (Mandisa &amp; TobyMac):</strong> Requested by Victor Glover - Woke the crew on lunar flyby day. Accompanied by a congratulatory message from Jim Lovell (Apollo 8/13), who congratulated the crew on breaking his distance record.</li>
          <li><strong>FD05 - Working Class Heroes (CeeLo Green):</strong> Accompanied by a special wake-up message from Apollo 16 moonwalker Charlie Duke.</li>
          <li><strong>FD04 - Pink Pony Club (Chappell Roan, 2020):</strong> Requested by Reid Wiseman - Mission control famously cut the audio after 'heels' — Commander Wiseman quipped 'We were all eagerly awaiting the chorus.'</li>
          <li><strong>FD03 - In a Daydream (Freddy Jones Band, 1992):</strong> Classic 90s rock to start the first full day of deep space cruise.</li>
          <li><strong>FD02 - Sleepyhead (Young and Sick):</strong> Requested by Christina Koch - Early morning wake-up call to end the first sleep period.</li>
          <li><strong>FD02 - Green Light (John Legend feat. André 3000, 2024):</strong> Played as the crew prepared for the historic Trans-Lunar Injection burn.</li>
        </ul>
      </div>
    ),
  },
];

export const bouclierItemsEN: { question: string; answer: string | React.ReactNode }[] = [
  {
    question: "Why a radiation shield?",
    answer: (
      <div className="space-y-2">
        <p>In deep space (once you move away from Earth), neither Earth's atmosphere nor its magnetic field shields the crew. Astronauts face radiation (rays and charged particles) primarily from the Sun, but also from the rest of space. The farther from Earth, the higher the exposure risk.</p>
        <p>The consequences of this radiation include:</p>
        <ul className="list-disc list-inside space-y-1 text-muted-foreground">
          <li>For humans: prolonged exposure to high doses damages the body, notably DNA, and can cause serious illnesses including cancer.</li>
          <li>For electronics: radiation hitting the wrong component can cause bugs or failures. In severe cases, sensitive components can be permanently damaged.</li>
        </ul>
        <p>For Artemis II, the Orion spacecraft already has partial shielding, and the flight plan avoids the densest charged-particle zones (Van Allen Belt). Without a solar flare directed toward Earth, the radiation shield is not strictly necessary. However, since the program aims at deeper space exploration, testing a deployable supplementary shield is a valuable objective for future long-duration missions toward the Moon and eventually Mars.</p>
        <p>For the Orion capsule, the procedure involves emptying a storage bay that is equipped with extra protection. An astronaut can take shelter inside. Since they are in microgravity, to prevent a CO₂ pocket from stagnating around the sheltered astronaut, the umbilical cord of their suit is used to create air circulation. The test was completed without incident.</p>
      </div>
    ),
  },
];

export const survolItemsEN: { question: string; answer: string | React.ReactNode }[] = [
  {
    question: "Why describe craters in detail when we know the Moon well?",
    answer: "Actually, we don't know the moon that well. For example, Reid Wiseman recently named two craters (Integrity and Carroll). The human eye distinguishes depth and color better than many cameras. Also, modern sensors are far superior to those from the Apollo era.",
  },
  {
    question: "Why are they the ones who went the furthest without landing?",
    answer: "They broke the record because they are on an orbit around the moon that is much farther out than the trajectories used for Apollo landings.",
  },
  {
    question: "What are the craters on the Moon? How many have been catalogued?",
    answer: (
      <div className="space-y-2">
        <p>Lunar craters are holes formed by meteorite, asteroid, or comet impacts. Since the Moon has no atmosphere to burn objects up and no wind or rain to erode them, impacts remain visible for millions or even billions of years.</p>
        <p>Maps obtained through space missions show:</p>
        <ul className="list-disc list-inside space-y-1 text-muted-foreground">
          <li>More than 1.3 million craters greater than 1 km in diameter on the Moon,</li>
          <li>A large portion is on the far side, which has fewer lunar seas (smooth zones).</li>
        </ul>
        <p>This data comes primarily from observations by NASA's Lunar Reconnaissance Orbiter mission.</p>
      </div>
    ),
  },
  {
    question: "What type of soil is on the Moon? Is it like clay?",
    answer: "Lunar soil (regolith) is fine dust formed by billions of years of impacts. It contains no water and is extremely abrasive—very different from Earth's clay.",
  },
  {
    question: "How close did the capsule pass to the Moon, and what was the maximum distance from Earth?",
    answer: (
      <div className="space-y-2">
        <p>The closest approach to the Moon was approximately <strong className="text-foreground/80">6,500 km</strong> altitude (reached at MET 5d 0h 25m 34s — 1:02:34 AM French time), with an average flyby distance of around 8,000 km.</p>
        <p>The maximum distance from Earth was reached at MET 5d 0h 27m 39s (1:04:39 AM French time) for a total of <strong className="text-foreground/80">406,771 km</strong> — or 252,756 miles, a new human distance record.</p>
      </div>
    ),
  },
  {
    question: "Why say \"sea\" for places on the Moon?",
    answer: "Early astronomers mistook these dark, lava-filled plains for bodies of water.",
  },
  {
    question: "How will the communications blackout with Orion play out?",
    answer: "When Orion passes behind the Moon, the capsule will be cut off from Houston because the Moon will be between it and Earth. Since communications happen via radio waves, a line of sight is necessary. There will be roughly 40 minutes to an hour of blackout.",
  },
];

export const retourItemsEN: { question: string; answer: string | React.ReactNode }[] = [
  {
    question: "What problems were found with the Orion heat shield?",
    answer: (
      <div className="space-y-2">
        <p>During the uncrewed test mission (Artemis 1, 2022), engineers inspected the heat shield upon return and found:</p>
        <ul className="list-disc list-inside space-y-1 text-muted-foreground">
          <li>Over a hundred chunks of the heat shield were torn away during atmospheric reentry, which could potentially puncture the drogue parachutes.</li>
          <li>Corrosion of separation bolts between the capsule and service module on the heat shield could create gaps exposing the capsule exterior, posing a crew survival risk.</li>
        </ul>
        <p>To address these issues, the reentry trajectory was adjusted compared to Artemis 1: the atmospheric reentry will be performed at a shallower angle and lower speed.</p>
      </div>
    ),
  },
  {
    question: "What will happen to the service module after separation?",
    answer: "Like the first and second stages of the rocket, the service module will be separated from the capsule close to Earth and will partially burn up in the atmosphere. Any debris that survives reentry will simply fall into the ocean. The European Service Module and capsule separation will occur 20 minutes before reentry.",
  },
  {
    question: "Where will the astronauts splash down? How will they be recovered?",
    answer: "The astronauts are expected to splash down in the Pacific Ocean off the coast of San Diego shortly after 02:00 AM (French time) on April 11th. They will be retrieved by helicopter and brought aboard a US Navy recovery ship.",
  },
  {
    question: "NASA press conference information (Night of April 8–9):",
    answer: (
      <div className="space-y-2">
        <ul className="list-disc list-inside space-y-1 text-muted-foreground">
          <li>Atmospheric entry speed: 38,377 km/h (10.7 km/s), equivalent to 31.3× the speed of sound at sea level! The Apollo 10 record (39,897 km/h, 11.1 km/s, 32.6× the speed of sound) will not be broken;</li>
          <li>Conditions at splashdown: winds at 10 knots and waves of ~4 feet / ~1.2 m;</li>
          <li>Spacecraft fuel: 50% remaining;</li>
          <li>Separation between Orion and the European Service Module (ESM): 42 minutes before splashdown;</li>
          <li>Start of the reentry phase at 122 km altitude;</li>
          <li>G-forces on the astronauts: on the nominal trajectory, peaks of 3.9G; in case of a contingency trajectory, peaks of up to 7.5G.</li>
        </ul>
        <p>Reminder: Splashdown was planned for ~02:06 AM French time.</p>
      </div>
    ),
  },
  {
    question: "Does the capsule bounce to aim for splashdown?",
    answer: (
      <div className="space-y-2">
        <p>Yes, but differently from Artemis I.</p>
        <p>For Artemis I, the capsule bounced to lose speed, exited the atmosphere, then fell back in (Skip Entry).</p>
        <p>Due to the problems identified with the heat shield, reentry for Artemis II will be slightly different. There is still a bounce, but without exiting the atmosphere (Lofted Entry Sequence). The goal is to reduce the duration of exposure to extreme temperatures, at the cost of a higher peak temperature reached.</p>
      </div>
    ),
  },
  {
    question: "Why not do one more orbit to slow down?",
    answer: (
      <div className="space-y-2">
        <p>Because:</p>
        <ul className="list-disc list-inside space-y-1 text-muted-foreground">
          <li>To enter another orbit, you must first slow down in space (otherwise, the spacecraft would head back toward the Moon);</li>
          <li>Once on that orbit, you are not slowing down any further;</li>
          <li>Orbital speed would still be very high (~28,000 km/h).</li>
        </ul>
        <p>Slowing down to enter that orbit would require a large amount of fuel (significant delta-v, comparable to the trans-lunar injection burn), meaning a much larger spacecraft and therefore a much larger rocket. It is therefore more efficient to reenter the atmosphere directly.</p>
      </div>
    ),
  },
  {
    question: "In what order will they exit? Who recovers them? And what about the capsule?",
    answer: "They will be retrieved by Navy divers in small zodiac boats and brought onto the USS John P. Murtha (a U.S. Navy transport ship). They will exit the capsule through the top hatch since they are floating on water. First Christina Koch, then Victor Glover, followed by Jeremy Hansen and finally Reid Wiseman, the commander. There is an active debate on whether they should exit while still wearing their orange suits or in a different outfit. The capsule itself will be hauled into the flooded well deck of the ship and then brought back to land.",
  },
];

export const lexiqueItemsEN: { question: string; answer: string | React.ReactNode }[] = [
  {
    question: "Terminator",
    answer: "The terminator is the moving line between the light and dark sides of a planet or moon.",
  },
  {
    question: "Albedo",
    answer: "Albedo is a measure of how much light a surface reflects. A high albedo means a surface reflects most light (like snow); a low albedo means it absorbs most light (comme asphalt).",
  },
  {
    question: "Landing (Atterrir) and not Moon-landing (Alunir) !!!!!!!!!",
    answer: "We say \"landing\" (atterrir) as soon as we land on a solid surface, regardless of the celestial body. The term \"alunir\" is a slightly obsolete French specificity. Astronauts and pilots use \"landing\" for all planetary surfaces.",
  },
];

export const momentsClesEN = [
  { met: "00:00:00", label: "SLS Rocket Liftoff", link: "https://www.youtube.com/live/-F9jJPtkVAg?si=g-B7p62pFjxVfDZw&t=15937" },
  { met: "00:03:22", label: "Second Stage Separation (ICPS)", link: "https://www.youtube.com/live/K_0yFJhNFWk?si=-lcwWfdvFwYCxBE9&t=5832" },
  { met: "00:03:24", label: "Maneuvers around ICPS", link: "https://www.youtube.com/live/K_0yFJhNFWk?si=53QWtmwUBap8HI_g&t=5918" },
  { met: "01:01:15", label: "Trans-Lunar Injection (TLI)", link: "https://youtu.be/D5mjObehN8o?t=21959" },
  { met: "02:00:37", label: "Crew relaxation moment", link: "https://www.youtube.com/live/pJBMGpt6n90?si=tNQ_cBFKvXUDukKz&t=19059" },
  { met: "04:19:21", label: "Distance record broken (Apollo 13)", link: "https://youtu.be/-TxtYUdOPOw?t=13339" },
  { met: "04:19:23", label: "Naming of craters (Integrity & Carroll)", link: "https://youtu.be/-TxtYUdOPOw?t=13439" },
  { met: "05:00:25", label: "Closest approach to the Moon (6,500 km)", link: "https://www.youtube.com/live/pK-hXpE63jI?si=pUu0-XN7l5z6tY_U&t=3750" },
  { met: "05:01:16", label: "First Earthrise images", link: "https://www.youtube.com/live/pK-hXpE63jI?si=x_V9k7p2_z6vU_X-&t=4500" },
  { met: "07:00:45", label: "Canada event", link: "https://www.youtube.com/live/L-SGXxhStAc?si=EddAPw80QK0CDoqm&t=15683" },
  { met: "07:03:45", label: "Victor's show", link: "https://www.youtube.com/live/L-SGXxhStAc?si=J1JCN0cM50bjOt6J&t=25879" },
  { met: "07:18:24", label: "First wake-up on the return journey", link: "https://www.youtube.com/live/pJBMGpt6n90?si=tNQ_cBFKvXUDukKz&t=19059" },
  { met: "08:23:12", label: "A memorable Earthrise", link: "https://www.youtube.com/live/pJBMGpt6n90?si=tNQ_cBFKvXUDukKz&t=21000" },
];

export const ressourcesExtraEN = [
  { label: "WikiArchives Space", url: "https://www.wikiarchives.space", desc: "All HD photos and videos from the mission" },
  { label: "NASA Flight Path", url: "https://svs.gsfc.nasa.gov/20412/", desc: "Real-time 3D trajectory" },
  { label: "Artemis II Spotify", url: "https://open.spotify.com/playlist/0WO94bzZeuUun777vv6UJu", desc: "Wake-Up Songs playlist" },
];

export const planningEventsEN = [
  {
    date: "APRIL 4, 2026", events: [
      { time: "00:32", desc: "OTC-1 BURN" },
      { time: "02:44", desc: "NASA Conference from capsule (SAW CAMERA \"SELFIE\")" },
      { time: "05:00", desc: "LUNAR FLYBY CABIN CONFIGURATION" },
      { time: "06:59", desc: "CSA Conference from capsule" },
      { time: "09:54", desc: "Astronaut end of day" },
      { time: "18:24", desc: "Astronaut wake up" },
      { time: "20:49", desc: "NASA Conference from capsule" },
      { time: "22:34", desc: "NASA Conference from capsule" },
      { time: "23:15", desc: "Conference from Houston" }
    ]
  },
  {
    date: "APRIL 5, 2026", events: [
      { time: "01:32", desc: "OTC-2 BURN" },
      { time: "02:59", desc: "MANUAL PILOTING DETAILED FLIGHT TEST OBJECTIVE" },
      { time: "03:29", desc: "LUNAR IMAGING REVIEW FOR FLYBY OPERATIONS" },
      { time: "06:14", desc: "CSA VIP Call" },
      { time: "09:09", desc: "Astronaut end of day" },
      { time: "17:39", desc: "Astronaut wake up" },
      { time: "20:09", desc: "OCSS SUIT DETAILED FLIGHT TEST OBJECTIVES" },
      { time: "21:30", desc: "Conference from Houston" }
    ]
  },
  {
    date: "APRIL 6, 2026", events: [
      { time: "04:34", desc: "Trajectory Correction 3" },
      { time: "06:30", desc: "INTEGRITY ENTERS LUNAR SPHERE OF INFLUENCE" },
      { time: "08:09", desc: "Astronaut end of day" },
      { time: "16:39", desc: "Astronaut wake up" },
      { time: "19:45", desc: "INTEGRITY SURPASSES APOLLO 13 DISTANCE RECORD" },
      { time: "19:59", desc: "CREW RECOGNIZES APOLLO 13 DISTANCE RECORD (AUDIO ONLY)" },
      { time: "20:04", desc: "CREW CONFIGURES INTEGRITY CABIN FOR FLYBY OPERATIONS" },
      { time: "20:34", desc: "LUNAR OBSERVATION PERIOD (FLYBY) BEGINS" }
    ]
  },
  {
    date: "APRIL 7, 2026", events: [
      { time: "00:36", desc: "PLANNED LOSS OF COMMUNICATION (BEHIND MOON)" },
      { time: "01:02", desc: "INTEGRITY MAKES CLOSEST APPROACH TO MOON — 6,500 km / 4,067 miles" },
      { time: "01:04", desc: "INTEGRITY REACHES MAXIMUM DISTANCE FROM EARTH — 406,771 km / 252,756 miles" },
      { time: "01:16", desc: "PLANNED SIGNAL ACQUISITION WITH INTEGRITY" },
      { time: "01:24", desc: "CREW INTERIOR VIEWS DURING LUNAR FLYBY" },
      { time: "03:30", desc: "LUNAR OBSERVATION PERIOD (FLYBY) ENDS" },
      { time: "07:54", desc: "Astronaut end of day" },
      { time: "17:24", desc: "Astronaut wake up" },
      { time: "19:17", desc: "INTEGRITY LEAVES LUNAR SPHERE OF INFLUENCE TOWARD EARTH" },
      { time: "20:29", desc: "NASA PAO EVENT - VEHICLE-TO-VEHICLE CALL BETWEEN INTEGRITY AND ISS (AUDIO ONLY)" },
      { time: "20:49", desc: "POST-FLYBY CREW DEBRIEF WITH SCIENCE OFFICIALS" },
      { time: "21:19", desc: "CREW BEGINS SLEEP PERIOD" }
    ]
  },
  {
    date: "APRIL 8, 2026", events: [
      { time: "04:39", desc: "NASA Conference from capsule" },
      { time: "08:54", desc: "Astronaut end of day" },
      { time: "17:24", desc: "Astronaut wake up" },
      { time: "21:30", desc: "Conference from Houston" },
      { time: "23:09", desc: "CSA Conference from capsule" }
    ]
  },
  {
    date: "APRIL 9, 2026", events: [
      { time: "00:04", desc: "RADIATION SHIELDING DEPLOYMENT DEMONSTRATION" },
      { time: "02:44", desc: "MANUAL PILOTING DETAILED FLIGHT TEST OBJECTIVE" },
      { time: "08:54", desc: "Astronaut end of day" },
      { time: "17:24", desc: "Astronaut wake up" },
      { time: "21:30", desc: "Conference from Houston" },
      { time: "23:59", desc: "Conference from capsule" }
    ]
  },
  {
    date: "APRIL 10, 2026", events: [
      { time: "01:54", desc: "NASA Conference from capsule" },
      { time: "04:53", desc: "Trajectory Correction RTC-2 BURN" },
      { time: "08:54", desc: "Astronaut end of day" },
      { time: "17:24", desc: "Astronaut wake up" },
      { time: "19:39", desc: "ENTRY CABIN CONFIGURATION BEGINS" },
      { time: "20:53", desc: "Trajectory Correction RTC-3 BURN" },
      { time: "21:09", desc: "CREW CONTINUES ENTRY CABIN CONFIGURATION" },
      { time: "22:54", desc: "CREW BEGINS ENTRY CHECKLIST" }
    ]
  },
  {
    date: "APRIL 11, 2026", events: [
      { time: "01:33", desc: "CM AND SM SEPARATION" },
      { time: "01:36", desc: "CREW MODULE RAISE BURN" },
      { time: "01:53", desc: "ATMOSPHERIC ENTRY INTERFACE" },
      { time: "02:06", desc: "SPLASHDOWN" },
      { time: "02:21", desc: "POWER DOWN" },
      { time: "03:05", desc: "TARGET TIME FOR CREW EGRESS" },
      { time: "03:35", desc: "CREW ARRIVAL ON RECOVERY SHIP" },
      { time: "04:35", desc: "POST-SPLASHDOWN PRESS CONFERENCE (JSC)" }
    ]
  }
];
