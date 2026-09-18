# Pizza Piccola

Gra przeglądarkowa o komponowaniu pizzy, z polskim interfejsem i autorską grafiką rysowaną w Canvas. Bez instalowania zależności.

## Uruchomienie

Wymagany Node.js 18 lub nowszy.

```sh
npm run dev
```

Otwórz http://localhost:5173 (albo inny port: `PORT=5174 npm run dev`). Testy logiki gry: `npm test`.

Po wgraniu nowej wersji podbij `version` w `package.json` oraz `?v=` w `index.html` i `game.js` (albo uruchamiaj przez `npm start` — serwer sam doklei `?v=` z `package.json`). Dzięki temu przeglądarka pobierze świeże CSS/JS zamiast trzymać cache.

## Rozgrywka

- Wybierz składnik i klikaj na pizzy albo przeciągaj dodatki z zasobnika.
- Realizuj kolejne zamówienia. Zgodność ilości, pokrycie całego placka (środek i brzeg) oraz równomierne rozłożenie wpływają na ocenę oraz monety.
- Wskaźnik pokrycia i rada szefa podpowiadają w trakcie układania. Wyższy poziom odblokowuje nowych klientów i gęstsze pizze.
- Cofaj ruchy, usuwaj pojedyncze składniki lub wyczyść placek. Czyszczenie też można cofnąć.
- Kliknij „Do pieca!”, odbierz wynik i przejdź do następnego klienta.
- Tryb „Gotuj po swojemu” pozwala tworzyć bez ocen. Przełączanie trybów zachowuje niedokończone pizze w pamięci bieżącej sesji.
- Monety i liczba obsłużonych zamówień zapisują się lokalnie w przeglądarce.
- Klawiatura: Tab i Enter wybierają składniki; strzałki przesuwają kursor na pizzy; Enter dodaje; Ctrl/Command+Z cofa. Opcjonalny dźwięk w stopce.

Grafika i dźwięki są generowane lokalnie. Opcjonalne fonty Google mają systemowe zamienniki, więc gra działa także bez dostępu do internetu po załadowaniu plików z lokalnego serwera. Nie wymaga konta ani backendu.
