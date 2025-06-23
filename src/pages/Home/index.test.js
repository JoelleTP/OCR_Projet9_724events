import { fireEvent, render, screen, within } from "@testing-library/react";
import { DataProvider, api } from "../../contexts/DataContext";
import Home from "./index";

describe("When Form is created", () => {
  it("a list of fields card is displayed", async () => {
    render(<Home />);
    await screen.findByText("Email");
    await screen.findByText("Nom");
    await screen.findByText("Prénom");
    await screen.findByText("Personel / Entreprise");
  });

  describe("and a click is triggered on the submit button", () => {
    it("the success message is displayed", async () => {
      render(<Home />);
      fireEvent(
        await screen.findByText("Envoyer"),
        new MouseEvent("click", {
          cancelable: true,
          bubbles: true,
        })
      );
      await screen.findByText("En cours");
      await screen.findByText("Message envoyé !");
    });
  });

});

const mockData = {
  events: [
    {
      "id": 3,
      "type": "conférence",
      "date": "2022-03-29T20:28:45.744Z",
      "title": "Conférence &co-responsable",
      "cover": "/images/chuttersnap-Q_KdjKxntH8-unsplash.png",
      "description": "Débats et échanges autour des collaborations eco-responsable.",
      "nb_guesses": 600,
      "periode": "24-25-26 Février",
      "prestations": [
        "1 scéne principale",
        "1 espaces de restaurations",
        "1 site web dédié"
        ]
    },
    {
      "id": 4,
      "type": "conférence",
      "date": "2022-08-29T20:28:45.744Z",
      "title": "Conférence #productCON",
      "cover": "/images/headway-F2KRf_QfCqw-unsplash.png",
      "description": "Présentation des outils analytics aux professionnels du secteur ",
      "nb_guesses": 1300,
      "periode": "24-25-26 Février",
      "prestations": [
        "1 espace d’exposition",
        "1 scéne principale",
        "2 espaces de restaurations",
        "1 site web dédié"
        ]
    },
    {
      "id": 10,
      "type": "soirée entreprise",
      "date": "2022-04-29T20:28:45.744Z",
      "title": "User&product MixUsers",
      "cover": "/images/alexandre-pellaes-6vAjp0pscX0-unsplash.png",
      "description": "Présentation des outils analytics aux professionnels du secteur",
      "nb_guesses": 1300,
      "periode": "24-25-26 Février",
      "prestations": [
        "1 espace d’exposition",
        "1 scéne principale",
        "2 espaces de restaurations",
        "1 site web dédié"
        ]
    },
  ],
  "focus": [
        {
            "title": "World economic forum",
            "description": "Oeuvre à la coopération entre le secteur public et le privé.",
            "date": "2022-01-29T20:28:45.744Z",
            "cover": "/images/evangeline-shaw-nwLTVwb7DbU-unsplash1.png"
        },
      ]
};

describe("When a page is created", () => {
  it("a list of events is displayed", async () => {
    api.loadData = jest.fn().mockReturnValue(mockData);
    render(
      <DataProvider>
        <Home />
      </DataProvider>
    );
    const cards = await screen.findAllByTestId("card-testid");
    expect(cards.length).toBeGreaterThan(0);
  })

  it("a list a people is displayed", async () => {
    render(<Home />);
    expect(await screen.findByText("Samira")).toBeInTheDocument();
    expect(await screen.findByText("Animateur")).toBeInTheDocument();
    expect(await screen.findByText("Christine")).toBeInTheDocument();
    const imageElements = await screen.findAllByTestId("card-image-testid");
    expect(imageElements.length).toBeGreaterThan(0);
  })

  it("a footer is displayed", async () => {
    render(<Home />);
    expect(await screen.findByText("Notre dernière prestation")).toBeInTheDocument();
    expect(await screen.findByText("Contactez-nous")).toBeInTheDocument();
    expect(await screen.findByTestId("last-event-card")).toBeInTheDocument();
  })

  it("an event card, with the last event, is displayed", async () => {
    api.loadData = jest.fn().mockReturnValue(mockData);
    render(
      <DataProvider>
        <Home />
      </DataProvider>
    );
    const lastEventCard = within(await screen.findByTestId("last-event-card"));
    expect(await lastEventCard.findByText("Conférence #productCON")).toBeInTheDocument();
  })

  it("a slider is displayed", async () => {
    api.loadData = jest.fn().mockReturnValue(mockData);
    render(
      <DataProvider>
        <Home />
      </DataProvider>
    );
    expect(await screen.findByText("World economic forum")).toBeInTheDocument();
  })

  it("a list of services is displayed", async () => {
    render(<Home />);
    expect(await screen.findByText("Soirée d’entreprise")).toBeInTheDocument();
  })
});
