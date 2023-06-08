import React, { useState } from "react";
import {
  Card,
  Table,
  TableHead,
  TableRow,
  TableHeaderCell,
  TableBody,
  TableCell,
  Text,
  Title,
  Badge,
} from "@tremor/react";
import { TURNS } from "../constants";
import { useAppSelector } from "../store/store/store";

export const MembersList = ({
  memberNames,
  socket,
  handleSelectMode,
  handleSeletStatus,
  handleSeletSymbol,
  handleStatusReady,
  handleSubmitTimer,
  isReady,
}) => {
  const state = useAppSelector((state) => state.tateti)

  return (
    <Card>
      <Title>Lista de jugadores de la sala.</Title>
      <Table className="mt-5">
        <TableHead>
          <TableRow>
            <TableHeaderCell>Nombre</TableHeaderCell>
            <TableHeaderCell>Status</TableHeaderCell>
            <TableHeaderCell>Ficha</TableHeaderCell>
            <TableHeaderCell>Modo de Jugador</TableHeaderCell>
            <TableHeaderCell>Selecciona tu ficha</TableHeaderCell>
            <TableHeaderCell>Listo?</TableHeaderCell>

            <TableHeaderCell>Selecciona el juego</TableHeaderCell>
            <TableHeaderCell>Tiempo</TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {memberNames?.map((player, index) => {
              console.log(player)

            return (
              <TableRow key={player.id}>
                <TableCell> {player.name}</TableCell>
                <TableCell>
                  <Text> {player.status}</Text>
                </TableCell>
                <TableCell>
                  <Text>{player.symbol}</Text>
                </TableCell>
                <TableCell>
                
                    {socket.id === player.id && (
                      <button
                        hidden={player.status === "Jugador" }
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full truncate overflow-hidden mb-2"
                        value={"Jugador"}
                        onClick={handleSeletStatus}
                      >
                        Ser Jugador
                      </button>
                    )}
                    {socket.id === player.id && (
                      <button
                        hidden={player.status=== "Espectador" || !player.status   }
                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full truncate overflow-hidden"
                        value={"Espectador"}
                        onClick={handleSeletStatus}
                      >
                        Ser espectador
                      </button>
                    )}
               
                </TableCell>
                <TableCell>
                  {socket.id === player.id && player.status === "Jugador" && (
                    <button
                      className="rounded-2xl bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 "
                      value={TURNS.X}
                      onClick={handleSeletSymbol}
                    >
                      {TURNS.X}
                    </button>
                  )}
                  {socket.id === player.id && player.status === "Jugador" && (
                    <button value={TURNS.O} onClick={handleSeletSymbol}>
                      {TURNS.O}
                    </button>
                  )}
                </TableCell>
                <TableCell>
                  {socket.id === player.id && player.status === "Jugador" && (
                    <form action="">
                      {/* <label id="ready">Estoy listo</label> */}
                      <input
                        type="checkbox"
                        checked={isReady}
                        onClick={handleStatusReady}
                        name="ready"
                        id="ready"
                      />
                    </form>
                  )}
                </TableCell>

                <TableCell>
                  {socket.id === player.id && index === 0 && (
                    <button
                      hidden={state.board.length === 9}
                      className="bg-yellow-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                      onClick={handleSelectMode}
                      value={"modeTateti"}
                    >
                      "Tateti"
                    </button>
                  )}
                  {socket.id === player.id && index === 0 && (
                    <button
                    hidden={state.board.length ===42}
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                      onClick={handleSelectMode}
                      value={"mode4inLine"}
                    >
                      "4 en linea"
                    </button>
                  )}
                </TableCell>
                <TableCell>
                  {socket.id === player.id && index === 0 && (
                    <form onSubmit={handleSubmitTimer}>
                      <label id="timer">Tiempo</label>
                      <input
                        name="timer"
                        type="text"
                        id="timer"
                        placeholder="10 seg, 5 seg...."
                      />
                      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded ml-1" >Cambiar</button>
                    </form>
                  )}
                </TableCell>
                {/* <TableCell>
              <Badge color="emerald" icon={StatusOnlineIcon}>
                {item.status}
              </Badge>
            </TableCell> */}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Card>
  );
};
