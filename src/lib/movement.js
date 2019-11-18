import { sample } from "lodash";
import state from "../state";
import { setEntityLocation } from "../state/setters/entity-setters";
import {
  setMapEntityLocations,
  setMapRevealed,
  setMapFov,
  removeEntityFromMap
} from "../state/setters/map-setters";
import createFov from "./fov";
import { WIDTH, HEIGHT } from "../constants";

const CARDINAL = [
  { x: -1, y: 0 },
  { x: 1, y: 0 },
  { x: 0, y: -1 },
  { x: 0, y: 1 }
];

export const drunkenWalk = (startX, startY) => {
  const direction = sample(CARDINAL);
  const x = startX + direction.x;
  const y = startY + direction.y;
  return { x, y };
};

export const canMoveTo = (x, y, id) => {
  const { currentMapId } = state.maps;
  const currentMap = state.maps[currentMapId];
  const { tiles, entityLocations } = currentMap;
  const { entities } = state;
  const locId = `${x},${y}`;

  // if walking into blocking tile - WALL
  if (tiles[locId].blocking) {
    return false;
  }

  // if walking into entity
  if (entityLocations[locId]) {
    // blocking entities - MONSTER / PLAYER
    const blockers = entityLocations[locId].filter(
      entityId => entities[entityId].blocking
    );

    if (blockers.length) {
      const blockingEntities = blockers.map(entityId => entities[entityId]);

      if (blockingEntities.length) {
        blockingEntities.forEach(entity => bump(entities[id], entity));

        return false;
      }
    }

    // non blocking entities pickups
    const pickups = entityLocations[locId].filter(
      entityId => entities[entityId].type === "PICKUP"
    );

    if (pickups.length) {
      const pickupEntities = pickups.map(id => entities[id]);

      pickupEntities.forEach(pickup => {
        entities[id][pickup.buff.prop] += pickup.buff.n;
        state.menu.log.push(
          `${entities[id].name} consumes ${pickup.name} for ${pickup.buff.n} ${pickup.buff.prop}`
        );
        removeEntityFromMap(locId, pickup.id, currentMapId);
      });
    }
  }

  return true;
};

export const attemptMove = (x, y, id) => {
  const { currentMapId } = state.maps;
  const currentMap = state.maps[currentMapId];
  const { tiles } = currentMap;

  if (canMoveTo(x, y, id)) {
    if (id === 0) {
      const fov = createFov(WIDTH, HEIGHT, x, y, tiles, 8);
      setMapFov(fov);
      setMapRevealed(fov.fov, currentMapId);
    }

    setEntityLocation(x, y, id);
    // todo: this doesn't have to reduce on everyone.
    // if we stash the locId from the entity BEFORE setting a new location
    // we can filter out the id, remove the array if it's empty and set the new one
    // seems like a lot of work when we can just reduce on the group like this...
    const { entityIds } = state.maps[currentMapId];
    const { entities } = state;
    const newEntityLocations = entityIds.reduce((acc, entityId) => {
      const locId = `${entities[entityId].x},${entities[entityId].y}`;
      acc[locId] = acc[locId] || [];
      acc[locId].push(entityId);
      return acc;
    }, {});

    setMapEntityLocations(newEntityLocations, currentMapId);
  }
};

const bump = (self, target) => {
  console.log(`${self.name} bumps into ${target.name}`);
  attack(self, target);
};

const attack = (self, target) => {
  const damage = 5;
  target.health -= 5;
  state.menu.log.push(`${self.name} attacks ${target.name} for ${damage} hp`);

  if (target.health <= 0) {
    kill(target);
    state.menu.log.push(`${self.name} kills ${target.name}`);
  }
};

const kill = target => {
  target.blocking = false;
  target.sprite = "CORPSE.FRESH";
  target.deathTime = state.game.turn;
};
