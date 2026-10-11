import { Section, Button } from './ui';

/* Mesa de regalos: la carta lleva el mensaje, la tienda con su botón y los datos bancarios. */
export default function Gifts({ config, laceTop, laceBottom }) {
  const { title, message, store, bank } = config.gifts;

  return (
    <Section id="deseos" tone="ivory" className="gifts" laceTop={laceTop} laceBottom={laceBottom} labelledBy="gifts-title">
      <h2 id="gifts-title" className="gifts__title">{title}</h2>

      <div className="gifts__stage">
        <img className="gifts__envelope" src={`${import.meta.env.BASE_URL}images/sobre.webp`} alt="" loading="lazy" decoding="async" />
        <div className="gifts__card">
          <p className="gifts__message">{message}</p>

          {store && (
            <div className="gifts__block">
              <p className="gifts__name">{store.name}</p>
              <p className="gifts__small">{store.eventLabel}: {store.eventNumber}</p>
              <Button variant="ghost" href={store.url}>
                {store.button}
              </Button>
            </div>
          )}

          {bank && (
            <div className="gifts__block">
              <p className="gifts__name">{bank.name}</p>
              <p className="gifts__small">{bank.holder}</p>
              <p className="gifts__small">{bank.account}</p>
            </div>
          )}
        </div>
      </div>
    </Section>
  );
}
