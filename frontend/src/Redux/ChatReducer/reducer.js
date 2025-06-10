import { CREATE_CHAT_HISTORY, ERROR, LOADING, REMOVE_CHAT_HISTORY, SET_CHAT_HISTORY, SET_CURRENT_LLM_RESPONSE } from "./actionTypes";

const initState = {
    isLoading: false,
    isError: false,
    chatHistory: [12],
    chatHistoryMap: {
        12: {
            title: "Infosys Vs Mahindra",
            history: [
                {
                    query: "What is the difference between Infosys and Mahindra?",
                    response: {
                        "llm_response": "**Letter to Shareholders Analysis:**\nThe management narrative for Infosys (INFY) is described as having a **forward-looking** tone, emphasizing capabilities, partnerships, and strategic direction. The style appears **assertive** and the emotion **upbeat**, focusing on driving value and market leadership. Transparency is 🟢Transparent regarding strategic focus areas. Key points include emphasis on innovation, branding, and knowledge leadership through initiatives like iCETS and IKI.\n\nThe Management Discussion and Analysis for Mahindra & Mahindra (M&M) has an **explanatory** tone, providing reasons behind financial movements and performance. The style is **neutral** and emotion appears **neutral**, focusing on detailing financial changes and strategic directions within group companies. Transparency is 🟢Transparent regarding financial performance explanations and subsidiary updates. Key points include highlighting successful cost management initiatives, improvements in financial health indicators (Interest Coverage, Debt Equity Ratio), and updates on subsidiary performance (e.g., KMPFL's AUM growth despite a loss).\n\nComparing the two, INFY's narrative is more focused on strategic initiatives and future positioning, while M&M's is more centered on explaining past financial performance and subsidiary updates.\n\n**Investor Relations Summary:**\nRelevant quantitative data for investors from the context:\n\n**Infosys Limited (INFY):**\n- Major shareholders (over 5% as of March 31, 2022): Deutsche Bank Trust Company Americas (Depository of ADRs) and Life Insurance Corporation of India. Specific share counts and percentage holdings are listed for these entities for both FY22 and FY21.\n- Reconciliation of shares outstanding and share capital provided, showing changes from March 31, 2021 to March 31, 2022, including shares issued on exercise of employee stock options and shares bought back.\n- Details of 2015 Stock Incentive Compensation Plan and 2019 Infosys Expanded Stock Ownership Program: Maximum authorized shares, accounting policies, typical vesting periods (4 years for RSUs/options, 1-3 years for performance RSUs), and performance parameters.\n\n**Mahindra & Mahindra Limited (M&M):**\n- Reference to standalone financial statements (Balance Sheet and Statement of Profit and Loss) for FY24 vs FY23.\n- Management highlights improvements in financial health indicators like Interest Coverage Ratio and Debt Equity Ratio (specific values not provided).\n- Cost management initiatives led to reductions in total expenditure as a percentage of income, material costs, and finance costs.\n- Financial highlights for Kotak Mahindra Pension Fund Limited (KMPFL) subsidiary (FY22 vs FY21):\n    - Total Income: ₹3.39 crore (FY22) vs ₹3.81 crore (FY21).\n    - PBT: (₹1.54) crore loss (FY22) vs ₹0.45 crore profit (FY21).\n    - PAT: (₹1.54) crore loss (FY22) vs ₹0.21 crore profit (FY21).\n    - AUM: Grew 42% to ₹2,230 crore (FY22) from ₹1,572 crore (FY21).\n    - Fund Performance (FY22): Top-performing in Government debt, among top two in Equity (NPS Tier 1).",
                        "company_overviews": [
                            {
                                "overview": {
                                    "overview_text": "For company Infosys Limited Company Overview Hide\n\nInfosys Limited (Infosys) is a global leader in next-generation digital services and consulting. Founded in 1981 in Pune, India, by seven engineers, the company initially focused on providing IT services to companies in the United States. Over the decades, Infosys has grown from a small startup to a multinational corporation with a significant global presence, serving clients across various industries and geographies. It is headquartered in Bangalore, India.\n\n**Key Business Operations and Segments:**\n\nInfosys's core business revolves around providing a wide range of technology and consulting services to help clients navigate their digital transformation journeys. These services are broadly categorized as:\n\n*   **Digital Transformation Services:** This segment is at the forefront of Infosys's offerings, encompassing services designed to help clients reinvent their businesses for the digital age. This includes cloud services (migration, management, and optimization), data analytics and artificial intelligence (AI), internet of things (IoT), cybersecurity, and digital process automation. Infosys assists organizations in modernizing their legacy systems, adopting new technologies, and building future-ready digital solutions.\n\n*   **Consulting Services:** Infosys Consulting provides strategic advisory services to help clients define their business strategies, improve operational efficiency, and navigate complex business challenges. These services include management consulting, business process consulting, and technology consulting. Consultants work closely with clients to understand their unique needs and develop tailored solutions that drive business value.\n\n*   **Engineering Services:** This segment focuses on providing engineering solutions and services across various industries, including aerospace, automotive, healthcare, and manufacturing. Infosys helps clients design, develop, and test new products and technologies, optimize their engineering processes, and improve product quality. Engineering services encompass areas such as product engineering, embedded systems, and manufacturing automation.\n\n*   **Application Development and Maintenance (ADM):** This is a traditional but still significant part of Infosys's business. ADM services involve developing new applications, maintaining existing applications, and modernizing application portfolios. Infosys utilizes various development methodologies, including Agile and DevOps, to deliver high-quality applications that meet clients' evolving business needs. The focus is also on modernizing application landscapes using cloud-native technologies.\n\n*   **Independent Validation Services:** This segment provides testing and validation services to ensure the quality, reliability, and security of software applications. Infosys offers a comprehensive suite of testing services, including functional testing, performance testing, security testing, and automation testing. Independent validation helps clients reduce risks associated with software defects and improve the overall quality of their IT systems.\n\n*   **Infrastructure Management Services:** Infosys provides infrastructure management services to help clients manage their IT infrastructure, including servers, networks, and storage systems. These services include infrastructure monitoring, maintenance, and support, as well as cloud infrastructure management. Infosys helps clients optimize their infrastructure performance, improve reliability, and reduce costs. They leverage automation and AI-powered tools for proactive monitoring and incident resolution.\n\n*   **Business Process Management (BPM):** Infosys BPM (formerly Infosys BPO) provides outsourcing services for various business processes, including finance and accounting, human resources, customer service, and supply chain management. BPM helps clients improve operational efficiency, reduce costs, and focus on their core competencies. They combine process expertise, technology, and analytics to deliver customized solutions that meet clients' specific needs.\n\n**Revenue Segments (Based on Industry Verticals):**\n\nInfosys derives revenue from a diversified portfolio of industries. While specific percentages fluctuate year to year, key industry verticals include:\n\n*   **Financial Services:** This is a significant revenue generator for Infosys. They provide services to banks, insurance companies, and other financial institutions, helping them with digital transformation, regulatory compliance, and operational efficiency. Areas of focus include digital banking, fraud detection, risk management, and wealth management.\n\n*   **Retail, Consumer Packaged Goods (CPG), and Logistics:** Infosys works with retailers, consumer goods companies, and logistics providers to help them optimize their supply chains, improve customer experience, and drive revenue growth. Services include e-commerce platform development, supply chain optimization, and data analytics.\n\n*   **Manufacturing:** Infosys provides solutions to manufacturers to improve their operational efficiency, optimize their supply chains, and develop new products. Services include product engineering, manufacturing automation, and predictive maintenance. Focus areas include Industry 4.0 initiatives.\n\n*   **Energy, Utilities, Resources, and Services:** This segment includes companies in the energy, utilities, resources, and services industries. Infosys helps these companies with digital transformation, operational efficiency, and sustainability initiatives. Specific areas of focus include smart grids, renewable energy, and resource management.\n\n*   **Communications, Media, and Entertainment:** Infosys provides services to telecommunications companies, media companies, and entertainment companies, helping them with digital transformation, content management, and customer engagement. Areas of focus include 5G, cloud services, and streaming platforms.\n\n*   **Life Sciences and Healthcare:** Infosys works with pharmaceutical companies, medical device manufacturers, and healthcare providers to help them improve patient care, accelerate drug development, and comply with regulations. Services include clinical trial management, drug discovery, and electronic health record (EHR) implementation.\n\n*   **Hi-Tech:** This vertical includes companies in the technology sector itself. Infosys helps these companies with product development, testing, and infrastructure management. They also support areas like semiconductor design and cloud services.\n\n*   **Others:** This category includes revenue from industries not explicitly listed above, contributing to the company's overall revenue diversification.\n\n**Relevant Historical Details:**\n\n*   **Founding:** Infosys was founded in 1981 by N. R. Narayana Murthy, Nandan Nilekani, S. Gopalakrishnan, S. D. Shibulal, K. Dinesh, Ashok Arora, and N. S. Raghavan with an initial capital of $250.\n\n*   **Initial Public Offering (IPO):** Infosys went public on the Bombay Stock Exchange (BSE) in 1993 and later on the NASDAQ in 1999, becoming the first Indian company to be listed on the NASDAQ.\n\n*   **Global Expansion:** Throughout the 1990s and 2000s, Infosys expanded its global presence by establishing offices and development centers in various countries, including the United States, Europe, and Asia. This expansion enabled the company to serve clients worldwide and tap into new markets.\n\n*   **Leadership Transitions:** Infosys has seen several leadership transitions over the years, with different CEOs guiding the company through various phases of growth and transformation. N. R. Narayana Murthy, Nandan Nilekani, S. Gopalakrishnan, and S. D. Shibulal have all served as CEOs, contributing to the company's success. In 2014, Vishal Sikka became the first non-founder CEO. Currently, Salil Parekh serves as the CEO of Infosys.\n\n*   **Strategic Acquisitions:** Infosys has made several strategic acquisitions to expand its capabilities and strengthen its market position. Notable acquisitions include Lodestone Holding AG, a global management consulting firm, and Panaya, a cloud-based automation technology provider. These acquisitions have enabled Infosys to offer a broader range of services and solutions to its clients.\n\n*   **Focus on Innovation:** Infosys has consistently invested in research and development to stay ahead of the curve in the rapidly evolving technology landscape. The company has established innovation labs and centers of excellence to explore emerging technologies and develop innovative solutions for its clients.\n\n*   **Commitment to Corporate Social Responsibility (CSR):** Infosys is committed to corporate social responsibility and has undertaken various initiatives to address social and environmental challenges. The Infosys Foundation, the company's philanthropic arm, supports programs in education, healthcare, and rural development.\n\n*   **Continued Evolution:** Infosys continues to evolve its offerings to meet the changing needs of its clients. The company is focused on providing end-to-end digital transformation solutions, leveraging technologies such as cloud computing, artificial intelligence, and data analytics. Infosys also emphasizes sustainability and responsible business practices.\n\nIn summary, Infosys is a global leader in technology services and consulting, providing a comprehensive suite of solutions to help clients navigate their digital transformation journeys. With a strong focus on innovation, strategic acquisitions, and a commitment to corporate social responsibility, Infosys is well-positioned to continue its growth and success in the years to come. The company's diversified revenue streams across industries and geographic locations contribute to its stability and resilience in the face of market fluctuations."
                                },
                                "stats": {
                                    "profile_metrics": {
                                        "columns": [
                                            "metric",
                                            "value",
                                            "unit",
                                            "as_of"
                                        ],
                                        "values": [
                                            [
                                                "Market Cap",
                                                620000,
                                                "Crore INR",
                                                "2023-10-27"
                                            ],
                                            [
                                                "EV",
                                                590500,
                                                "Crore INR",
                                                "2023-10-27"
                                            ],
                                            [
                                                "Shares Out",
                                                4148,
                                                "Million",
                                                "2023-10-27"
                                            ],
                                            [
                                                "Revenue",
                                                153670,
                                                "Crore INR",
                                                "2023-09-30"
                                            ],
                                            [
                                                "Employees",
                                                328000,
                                                "People",
                                                "2023-09-30"
                                            ]
                                        ]
                                    },
                                    "margins_metrics": {
                                        "columns": [
                                            "metric",
                                            "value",
                                            "unit",
                                            "as_of"
                                        ],
                                        "values": [
                                            [
                                                "Gross",
                                                35,
                                                "%",
                                                "2023-09-30"
                                            ],
                                            [
                                                "EBITDA",
                                                25,
                                                "%",
                                                "2023-09-30"
                                            ],
                                            [
                                                "Operating",
                                                21,
                                                "%",
                                                "2023-09-30"
                                            ],
                                            [
                                                "Pre-Tax",
                                                20,
                                                "%",
                                                "2023-09-30"
                                            ],
                                            [
                                                "Net",
                                                16.5,
                                                "%",
                                                "2023-09-30"
                                            ],
                                            [
                                                "FCF",
                                                18,
                                                "%",
                                                "2023-09-30"
                                            ]
                                        ]
                                    },
                                    "returns_5yr_avg_metrics": {
                                        "columns": [
                                            "metric",
                                            "value",
                                            "unit",
                                            "as_of"
                                        ],
                                        "values": [
                                            [
                                                "ROA",
                                                16,
                                                "%",
                                                "2023-03-31"
                                            ],
                                            [
                                                "ROTA",
                                                17,
                                                "%",
                                                "2023-03-31"
                                            ],
                                            [
                                                "ROE",
                                                24,
                                                "%",
                                                "2023-03-31"
                                            ],
                                            [
                                                "ROCE",
                                                28,
                                                "%",
                                                "2023-03-31"
                                            ],
                                            [
                                                "ROIC",
                                                25,
                                                "%",
                                                "2023-03-31"
                                            ]
                                        ]
                                    },
                                    "valuation_ttm_metrics": {
                                        "columns": [
                                            "metric",
                                            "value",
                                            "unit",
                                            "as_of"
                                        ],
                                        "values": [
                                            [
                                                "P/E",
                                                25,
                                                "Times",
                                                "2023-10-27"
                                            ],
                                            [
                                                "P/B",
                                                6.8,
                                                "Times",
                                                "2023-10-27"
                                            ],
                                            [
                                                "EV/Sales",
                                                3.84,
                                                "Times",
                                                "2023-10-27"
                                            ],
                                            [
                                                "EV/EBITDA",
                                                15.37,
                                                "Times",
                                                "2023-10-27"
                                            ],
                                            [
                                                "P/FCF",
                                                22.41,
                                                "Times",
                                                "2023-10-27"
                                            ],
                                            [
                                                "EV/Gross Profit",
                                                10.98,
                                                "Times",
                                                "2023-10-27"
                                            ]
                                        ]
                                    },
                                    "valuation_ntm_metrics": {
                                        "columns": [
                                            "metric",
                                            "value",
                                            "unit",
                                            "as_of"
                                        ],
                                        "values": [
                                            [
                                                "Price Target",
                                                1550,
                                                "INR",
                                                "2023-10-27"
                                            ],
                                            [
                                                "P/E",
                                                22,
                                                "Times",
                                                "2023-10-27"
                                            ],
                                            [
                                                "PEG",
                                                2,
                                                "Times",
                                                "2023-10-27"
                                            ],
                                            [
                                                "EV/Sales",
                                                3.5,
                                                "Times",
                                                "2023-10-27"
                                            ],
                                            [
                                                "EV/EBITDA",
                                                14,
                                                "Times",
                                                "2023-10-27"
                                            ],
                                            [
                                                "P/FCF",
                                                20,
                                                "Times",
                                                "2023-10-27"
                                            ]
                                        ]
                                    },
                                    "financial_health_metrics": {
                                        "columns": [
                                            "metric",
                                            "value",
                                            "unit",
                                            "as_of"
                                        ],
                                        "values": [
                                            [
                                                "Cash",
                                                35000,
                                                "Crore INR",
                                                "2023-09-30"
                                            ],
                                            [
                                                "Net Debt",
                                                -29500,
                                                "Crore INR",
                                                "2023-09-30"
                                            ],
                                            [
                                                "Debt/Equity",
                                                0.02,
                                                "Times",
                                                "2023-09-30"
                                            ],
                                            [
                                                "EBIT/Interest",
                                                60,
                                                "Times",
                                                "2023-09-30"
                                            ]
                                        ]
                                    },
                                    "growth_cagr_metrics": {
                                        "columns": [
                                            "metric",
                                            "value",
                                            "unit",
                                            "as_of"
                                        ],
                                        "values": [
                                            [
                                                "Rev 3Yr",
                                                15,
                                                "%",
                                                "2023-03-31"
                                            ],
                                            [
                                                "Rev 5Yr",
                                                13,
                                                "%",
                                                "2023-03-31"
                                            ],
                                            [
                                                "Rev 10Yr",
                                                11,
                                                "%",
                                                "2023-03-31"
                                            ],
                                            [
                                                "Dil EPS 3Yr",
                                                12,
                                                "%",
                                                "2023-03-31"
                                            ],
                                            [
                                                "Dil EPS 5Yr",
                                                10,
                                                "%",
                                                "2023-03-31"
                                            ],
                                            [
                                                "Dil EPS 10Yr",
                                                9,
                                                "%",
                                                "2023-03-31"
                                            ],
                                            [
                                                "Rev Fwd 2Yr",
                                                8,
                                                "%",
                                                "2023-10-27"
                                            ],
                                            [
                                                "EBITDA Fwd 2Yr",
                                                9,
                                                "%",
                                                "2023-10-27"
                                            ],
                                            [
                                                "EPS Fwd 2Yr",
                                                10,
                                                "%",
                                                "2023-10-27"
                                            ],
                                            [
                                                "EPS LT Growth Est",
                                                11,
                                                "%",
                                                "2023-10-27"
                                            ]
                                        ]
                                    }
                                }
                            },
                            {
                                "overview": {
                                    "overview_text": "For company Mahindra & Mahindra Company Overview Hide\n\nMahindra & Mahindra (M&M) is a multinational conglomerate headquartered in Mumbai, India, and is one of the largest companies in India. Founded in 1945 as Mahindra & Mohammed by brothers Kailash Chandra Mahindra and Jagdish Chandra Mahindra along with Malik Ghulam Mohammed, the company initially started as a steel trading company. It was renamed Mahindra & Mahindra in 1948 after Mohammed emigrated to Pakistan following partition. From its early days of assembling Willys Jeeps for the Indian market, M&M has grown into a diverse and expansive business house with a significant presence in various sectors.\n\n**Key Business Operations and Segments:**\n\nM&M's operations are broadly categorized into several core sectors. These include:\n\n*   **Automotive:** This segment is the cornerstone of M&M's business. The automotive division designs, develops, manufactures, and markets a wide range of vehicles, including:\n\n    *   **Utility Vehicles (UVs):** Mahindra is renowned for its UVs, which are typically rugged, reliable, and well-suited for Indian road conditions. Key models include the Scorpio, Bolero, XUV series (XUV700, XUV300), Thar, and more. These vehicles often cater to both personal and commercial transportation needs.\n    *   **Commercial Vehicles (CVs):** M&M also produces a range of commercial vehicles, including light commercial vehicles (LCVs), trucks, and buses. These vehicles cater to the transportation of goods and people, serving diverse business needs.\n    *   **Electric Vehicles (EVs):** Recognizing the growing importance of electric mobility, Mahindra has invested heavily in EV technology. Its electric vehicle portfolio includes the e2oPlus, eVerito, and eSupro. Mahindra aims to expand its EV offerings in the coming years significantly, demonstrating a commitment to sustainable transportation. Future models include electric versions of popular SUVs.\n    *   **Two-Wheelers:** Mahindra entered the two-wheeler market but later divested from mass-market two-wheelers. It now focuses on premium motorcycles through its subsidiary Classic Legends, which owns brands like Jawa and Yezdi, and through Peugeot Motocycles acquired from PSA Group.\n    *   **Construction Equipment:** Mahindra also manufactures and sells construction equipment such as backhoe loaders and compactors through Mahindra Construction Equipment.\n\n*   **Farm Equipment (Tractors):** Mahindra is the world's largest tractor manufacturer by volume. The farm equipment sector is crucial to M&M's business, especially in India, where agriculture is a significant economic driver.\n\n    *   **Tractors:** Mahindra tractors are known for their durability, reliability, and affordability. The company offers a wide range of tractors suitable for various farming applications, from small landholdings to large-scale agricultural operations.\n    *   **Agricultural Implements:** Besides tractors, M&M also produces and markets a range of agricultural implements, such as harvesters, planters, and cultivators, to provide comprehensive solutions for farmers.\n    *   **Precision Farming:** Mahindra is actively involved in promoting precision farming techniques, leveraging technology to improve agricultural productivity and efficiency.\n\n*   **Financial Services:** Mahindra Finance provides financial products and services primarily focused on the rural and semi-urban sectors in India.\n\n    *   **Vehicle Finance:** The company offers financing options for Mahindra vehicles, making them accessible to a broader customer base.\n    *   **Tractor Finance:** Mahindra Finance is a leading provider of tractor finance, supporting farmers in purchasing tractors and related equipment.\n    *   **SME Finance:** The company also provides financial assistance to small and medium-sized enterprises (SMEs) in rural areas, contributing to economic development.\n    *   **Housing Finance:** Mahindra Housing Finance offers loans for home construction and purchase, catering to the housing needs of customers in rural and semi-urban areas.\n\n*   **IT Services:** Mahindra's IT services arm, Tech Mahindra, is a global provider of digital transformation, consulting, and business re-engineering services and solutions.\n\n    *   **Consulting:** Tech Mahindra offers consulting services to help businesses optimize their operations, adopt new technologies, and achieve their strategic goals.\n    *   **Digital Transformation:** The company assists clients in their digital transformation journeys, enabling them to leverage the power of digital technologies to enhance their customer experiences, improve their processes, and drive innovation.\n    *   **Business Process Services (BPS):** Tech Mahindra provides BPS solutions to help businesses streamline their operations, reduce costs, and improve efficiency.\n    *   **Engineering Services:** The company offers engineering services to support product development, manufacturing, and infrastructure projects.\n    *   **Communications, Media & Entertainment:** This vertical caters to the needs of telecom operators, media companies, and entertainment providers, offering solutions for network modernization, content management, and customer engagement.\n\n*   **Defense:** Mahindra Defence Systems offers a range of defense solutions, including armored vehicles, naval systems, and security solutions. The company aims to contribute to India's defense capabilities and security.\n\n    *   **Armored Vehicles:** Mahindra Defence produces armored vehicles for military and paramilitary forces, providing protection and mobility in challenging environments.\n    *   **Naval Systems:** The company offers naval systems and solutions, including patrol boats, surveillance systems, and underwater warfare capabilities.\n    *   **Security Solutions:** Mahindra Defence provides security solutions for critical infrastructure, border protection, and homeland security.\n\n*   **Real Estate:** Mahindra Lifespace Developers is the real estate development arm of the Mahindra Group. It develops residential projects, integrated cities, and industrial clusters.\n\n    *   **Residential Projects:** Mahindra Lifespace develops residential projects catering to diverse customer segments, focusing on sustainable and eco-friendly designs.\n    *   **Integrated Cities:** The company develops integrated cities that offer a mix of residential, commercial, and social infrastructure, creating self-contained and sustainable communities.\n    *   **Industrial Clusters:** Mahindra Lifespace develops industrial clusters to provide a conducive environment for businesses to operate and grow.\n\n*   **Hospitality:** Mahindra Holidays & Resorts India operates a network of resorts and offers vacation ownership plans.\n\n    *   **Resorts:** Mahindra Holidays operates a chain of resorts across India and abroad, providing vacation experiences for families and individuals.\n    *   **Vacation Ownership:** The company offers vacation ownership plans, allowing members to enjoy vacation benefits at Mahindra resorts and affiliated properties.\n\n*   **Energy:** Mahindra Susten provides renewable energy solutions, including solar power generation.\n\n    *   **Solar Power:** Mahindra Susten develops and operates solar power projects, contributing to India's renewable energy goals.\n    *   **Energy Management:** The company offers energy management solutions to help businesses reduce their energy consumption and improve their energy efficiency.\n\n**Revenue Segments:**\n\nWhile precise revenue figures fluctuate annually and are detailed in M&M's financial reports, the primary revenue drivers can be broadly categorized:\n\n*   **Automotive Sector:** This typically contributes the largest share of revenue, driven by sales of UVs, CVs, and increasingly EVs.\n*   **Farm Equipment Sector:** Tractor sales contribute significantly, especially during strong agricultural seasons in India.\n*   **IT Services (Tech Mahindra):** Tech Mahindra is a major revenue generator, providing a diversified income stream through its global IT services operations.\n*   **Financial Services:** Mahindra Finance contributes a substantial portion through vehicle, tractor, and SME financing.\n*   **Other Segments:** The remaining segments (Defense, Real Estate, Hospitality, Energy, etc.) contribute smaller but still significant portions to the overall revenue.\n\n**Relevant Historical Details:**\n\n*   **1945:** Mahindra & Mohammed is founded as a steel trading company.\n*   **1948:** Renamed Mahindra & Mahindra. Begins assembling Willys Jeeps in India.\n*   **1960s-1980s:** Expands into tractor manufacturing and other sectors. Becomes a prominent player in the Indian automotive and agricultural landscape.\n*   **1990s-2000s:** Undergoes significant diversification and expansion, including the establishment of Tech Mahindra and entry into new sectors like financial services and real estate. Global Expansion begins through exports and partnerships.\n*   **2010s-Present:** Focuses on innovation, electric vehicles, and sustainable solutions. Strengthens its position as a global conglomerate with a strong presence in India and an expanding international footprint. Major acquisitions and partnerships occur. For example, acquisition of SsangYong Motors (though later divested). Significant investment in electric vehicle technology and infrastructure.\n\n**Overall, Mahindra & Mahindra is a diversified conglomerate with a strong foundation in the automotive and farm equipment sectors. Its commitment to innovation, sustainability, and global expansion positions it for continued growth in the future. The company's diverse portfolio of businesses allows it to weather economic cycles and capitalize on emerging opportunities. M&M's strong brand reputation and focus on customer satisfaction have contributed to its success and enduring presence in the Indian and global markets.** They are undergoing a strategic shift towards electric vehicles and modern farming practices, aiming to remain relevant in the rapidly evolving global market."
                                },
                                "stats": {
                                    "profile_metrics": {
                                        "columns": [
                                            "metric",
                                            "value",
                                            "unit",
                                            "as_of"
                                        ],
                                        "values": [
                                            [
                                                "Market Cap",
                                                260000,
                                                "Crore INR",
                                                "2023-10-27"
                                            ],
                                            [
                                                "EV",
                                                280000,
                                                "Crore INR",
                                                "2023-10-27"
                                            ],
                                            [
                                                "Shares Out",
                                                1245,
                                                "Million",
                                                "2023-10-27"
                                            ],
                                            [
                                                "Revenue",
                                                138884,
                                                "Crore INR",
                                                "2023-03-31"
                                            ],
                                            [
                                                "Employees",
                                                50000,
                                                "People",
                                                "2023-01-01"
                                            ]
                                        ]
                                    },
                                    "margins_metrics": {
                                        "columns": [
                                            "metric",
                                            "value",
                                            "unit",
                                            "as_of"
                                        ],
                                        "values": [
                                            [
                                                "Gross",
                                                28.1,
                                                "%",
                                                "2023-03-31"
                                            ],
                                            [
                                                "EBITDA",
                                                13,
                                                "%",
                                                "2023-03-31"
                                            ],
                                            [
                                                "Operating",
                                                9.4,
                                                "%",
                                                "2023-03-31"
                                            ],
                                            [
                                                "Pre-Tax",
                                                7.9,
                                                "%",
                                                "2023-03-31"
                                            ],
                                            [
                                                "Net",
                                                6.5,
                                                "%",
                                                "2023-03-31"
                                            ],
                                            [
                                                "FCF",
                                                5.8,
                                                "%",
                                                "2023-03-31"
                                            ]
                                        ]
                                    },
                                    "returns_5yr_avg_metrics": {
                                        "columns": [
                                            "metric",
                                            "value",
                                            "unit",
                                            "as_of"
                                        ],
                                        "values": [
                                            [
                                                "ROA",
                                                7,
                                                "%",
                                                "2023-03-31"
                                            ],
                                            [
                                                "ROTA",
                                                7.5,
                                                "%",
                                                "2023-03-31"
                                            ],
                                            [
                                                "ROE",
                                                13.5,
                                                "%",
                                                "2023-03-31"
                                            ],
                                            [
                                                "ROCE",
                                                11,
                                                "%",
                                                "2023-03-31"
                                            ],
                                            [
                                                "ROIC",
                                                10.5,
                                                "%",
                                                "2023-03-31"
                                            ]
                                        ]
                                    },
                                    "valuation_ttm_metrics": {
                                        "columns": [
                                            "metric",
                                            "value",
                                            "unit",
                                            "as_of"
                                        ],
                                        "values": [
                                            [
                                                "P/E",
                                                29,
                                                "Times",
                                                "2023-10-27"
                                            ],
                                            [
                                                "P/B",
                                                3.25,
                                                "Times",
                                                "2023-10-27"
                                            ],
                                            [
                                                "EV/Sales",
                                                2,
                                                "Times",
                                                "2023-10-27"
                                            ],
                                            [
                                                "EV/EBITDA",
                                                15.5,
                                                "Times",
                                                "2023-10-27"
                                            ],
                                            [
                                                "P/FCF",
                                                32.5,
                                                "Times",
                                                "2023-10-27"
                                            ],
                                            [
                                                "EV/Gross Profit",
                                                7.2,
                                                "Times",
                                                "2023-10-27"
                                            ]
                                        ]
                                    },
                                    "valuation_ntm_metrics": {
                                        "columns": [
                                            "metric",
                                            "value",
                                            "unit",
                                            "as_of"
                                        ],
                                        "values": [
                                            [
                                                "Price Target",
                                                1750,
                                                "INR",
                                                "2023-10-27"
                                            ],
                                            [
                                                "P/E",
                                                25,
                                                "Times",
                                                "2023-10-27"
                                            ],
                                            [
                                                "PEG",
                                                1.8,
                                                "Times",
                                                "2023-10-27"
                                            ],
                                            [
                                                "EV/Sales",
                                                1.8,
                                                "Times",
                                                "2023-10-27"
                                            ],
                                            [
                                                "EV/EBITDA",
                                                13,
                                                "Times",
                                                "2023-10-27"
                                            ],
                                            [
                                                "P/FCF",
                                                28,
                                                "Times",
                                                "2023-10-27"
                                            ]
                                        ]
                                    },
                                    "financial_health_metrics": {
                                        "columns": [
                                            "metric",
                                            "value",
                                            "unit",
                                            "as_of"
                                        ],
                                        "values": [
                                            [
                                                "Cash",
                                                10000,
                                                "Crore INR",
                                                "2023-03-31"
                                            ],
                                            [
                                                "Net Debt",
                                                20000,
                                                "Crore INR",
                                                "2023-03-31"
                                            ],
                                            [
                                                "Debt/Equity",
                                                0.4,
                                                "Times",
                                                "2023-03-31"
                                            ],
                                            [
                                                "EBIT/Interest",
                                                6.5,
                                                "Times",
                                                "2023-03-31"
                                            ]
                                        ]
                                    },
                                    "growth_cagr_metrics": {
                                        "columns": [
                                            "metric",
                                            "value",
                                            "unit",
                                            "as_of"
                                        ],
                                        "values": [
                                            [
                                                "Rev 3Yr",
                                                15,
                                                "%",
                                                "2023-03-31"
                                            ],
                                            [
                                                "Rev 5Yr",
                                                12,
                                                "%",
                                                "2023-03-31"
                                            ],
                                            [
                                                "Rev 10Yr",
                                                10,
                                                "%",
                                                "2023-03-31"
                                            ],
                                            [
                                                "Dil EPS 3Yr",
                                                25,
                                                "%",
                                                "2023-03-31"
                                            ],
                                            [
                                                "Dil EPS 5Yr",
                                                18,
                                                "%",
                                                "2023-03-31"
                                            ],
                                            [
                                                "Dil EPS 10Yr",
                                                15,
                                                "%",
                                                "2023-03-31"
                                            ],
                                            [
                                                "Rev Fwd 2Yr",
                                                10,
                                                "%",
                                                "2023-10-27"
                                            ],
                                            [
                                                "EBITDA Fwd 2Yr",
                                                12,
                                                "%",
                                                "2023-10-27"
                                            ],
                                            [
                                                "EPS Fwd 2Yr",
                                                15,
                                                "%",
                                                "2023-10-27"
                                            ],
                                            [
                                                "EPS LT Growth Est",
                                                15,
                                                "%",
                                                "2023-10-27"
                                            ]
                                        ]
                                    }
                                }
                            }
                        ],
                        "chart_data": {
                            "plotly_json": "{\"data\":[{\"mode\":\"lines+markers\",\"name\":\"Infosys Limited - sales\",\"x\":[\"2015-03-31\",\"2016-03-31\",\"2017-03-31\",\"2018-03-31\",\"2019-03-31\",\"2020-03-31\",\"2021-03-31\",\"2022-03-31\",\"2023-03-31\",\"2024-03-31\"],\"y\":[53319.0,62441.0,68484.0,70522.0,82675.0,90791.0,100472.0,121641.0,146767.0,153670.0],\"type\":\"scatter\"},{\"mode\":\"lines+markers\",\"name\":\"Mahindra & Mahindra - sales\",\"x\":[\"2015-03-31\",\"2016-03-31\",\"2017-03-31\",\"2018-03-31\",\"2019-03-31\",\"2020-03-31\",\"2021-03-31\",\"2022-03-31\",\"2023-03-31\",\"2024-03-31\"],\"y\":[71448.0,75841.42,83773.05,92093.95,104720.68,75381.93,74277.78,90170.57,121268.55,139078.27],\"type\":\"scatter\"}],\"layout\":{\"template\":{\"data\":{\"histogram2dcontour\":[{\"type\":\"histogram2dcontour\",\"colorbar\":{\"outlinewidth\":0,\"ticks\":\"\"},\"colorscale\":[[0.0,\"#0d0887\"],[0.1111111111111111,\"#46039f\"],[0.2222222222222222,\"#7201a8\"],[0.3333333333333333,\"#9c179e\"],[0.4444444444444444,\"#bd3786\"],[0.5555555555555556,\"#d8576b\"],[0.6666666666666666,\"#ed7953\"],[0.7777777777777778,\"#fb9f3a\"],[0.8888888888888888,\"#fdca26\"],[1.0,\"#f0f921\"]]}],\"choropleth\":[{\"type\":\"choropleth\",\"colorbar\":{\"outlinewidth\":0,\"ticks\":\"\"}}],\"histogram2d\":[{\"type\":\"histogram2d\",\"colorbar\":{\"outlinewidth\":0,\"ticks\":\"\"},\"colorscale\":[[0.0,\"#0d0887\"],[0.1111111111111111,\"#46039f\"],[0.2222222222222222,\"#7201a8\"],[0.3333333333333333,\"#9c179e\"],[0.4444444444444444,\"#bd3786\"],[0.5555555555555556,\"#d8576b\"],[0.6666666666666666,\"#ed7953\"],[0.7777777777777778,\"#fb9f3a\"],[0.8888888888888888,\"#fdca26\"],[1.0,\"#f0f921\"]]}],\"heatmap\":[{\"type\":\"heatmap\",\"colorbar\":{\"outlinewidth\":0,\"ticks\":\"\"},\"colorscale\":[[0.0,\"#0d0887\"],[0.1111111111111111,\"#46039f\"],[0.2222222222222222,\"#7201a8\"],[0.3333333333333333,\"#9c179e\"],[0.4444444444444444,\"#bd3786\"],[0.5555555555555556,\"#d8576b\"],[0.6666666666666666,\"#ed7953\"],[0.7777777777777778,\"#fb9f3a\"],[0.8888888888888888,\"#fdca26\"],[1.0,\"#f0f921\"]]}],\"contourcarpet\":[{\"type\":\"contourcarpet\",\"colorbar\":{\"outlinewidth\":0,\"ticks\":\"\"}}],\"contour\":[{\"type\":\"contour\",\"colorbar\":{\"outlinewidth\":0,\"ticks\":\"\"},\"colorscale\":[[0.0,\"#0d0887\"],[0.1111111111111111,\"#46039f\"],[0.2222222222222222,\"#7201a8\"],[0.3333333333333333,\"#9c179e\"],[0.4444444444444444,\"#bd3786\"],[0.5555555555555556,\"#d8576b\"],[0.6666666666666666,\"#ed7953\"],[0.7777777777777778,\"#fb9f3a\"],[0.8888888888888888,\"#fdca26\"],[1.0,\"#f0f921\"]]}],\"surface\":[{\"type\":\"surface\",\"colorbar\":{\"outlinewidth\":0,\"ticks\":\"\"},\"colorscale\":[[0.0,\"#0d0887\"],[0.1111111111111111,\"#46039f\"],[0.2222222222222222,\"#7201a8\"],[0.3333333333333333,\"#9c179e\"],[0.4444444444444444,\"#bd3786\"],[0.5555555555555556,\"#d8576b\"],[0.6666666666666666,\"#ed7953\"],[0.7777777777777778,\"#fb9f3a\"],[0.8888888888888888,\"#fdca26\"],[1.0,\"#f0f921\"]]}],\"mesh3d\":[{\"type\":\"mesh3d\",\"colorbar\":{\"outlinewidth\":0,\"ticks\":\"\"}}],\"scatter\":[{\"fillpattern\":{\"fillmode\":\"overlay\",\"size\":10,\"solidity\":0.2},\"type\":\"scatter\"}],\"parcoords\":[{\"type\":\"parcoords\",\"line\":{\"colorbar\":{\"outlinewidth\":0,\"ticks\":\"\"}}}],\"scatterpolargl\":[{\"type\":\"scatterpolargl\",\"marker\":{\"colorbar\":{\"outlinewidth\":0,\"ticks\":\"\"}}}],\"bar\":[{\"error_x\":{\"color\":\"#2a3f5f\"},\"error_y\":{\"color\":\"#2a3f5f\"},\"marker\":{\"line\":{\"color\":\"#E5ECF6\",\"width\":0.5},\"pattern\":{\"fillmode\":\"overlay\",\"size\":10,\"solidity\":0.2}},\"type\":\"bar\"}],\"scattergeo\":[{\"type\":\"scattergeo\",\"marker\":{\"colorbar\":{\"outlinewidth\":0,\"ticks\":\"\"}}}],\"scatterpolar\":[{\"type\":\"scatterpolar\",\"marker\":{\"colorbar\":{\"outlinewidth\":0,\"ticks\":\"\"}}}],\"histogram\":[{\"marker\":{\"pattern\":{\"fillmode\":\"overlay\",\"size\":10,\"solidity\":0.2}},\"type\":\"histogram\"}],\"scattergl\":[{\"type\":\"scattergl\",\"marker\":{\"colorbar\":{\"outlinewidth\":0,\"ticks\":\"\"}}}],\"scatter3d\":[{\"type\":\"scatter3d\",\"line\":{\"colorbar\":{\"outlinewidth\":0,\"ticks\":\"\"}},\"marker\":{\"colorbar\":{\"outlinewidth\":0,\"ticks\":\"\"}}}],\"scattermap\":[{\"type\":\"scattermap\",\"marker\":{\"colorbar\":{\"outlinewidth\":0,\"ticks\":\"\"}}}],\"scattermapbox\":[{\"type\":\"scattermapbox\",\"marker\":{\"colorbar\":{\"outlinewidth\":0,\"ticks\":\"\"}}}],\"scatterternary\":[{\"type\":\"scatterternary\",\"marker\":{\"colorbar\":{\"outlinewidth\":0,\"ticks\":\"\"}}}],\"scattercarpet\":[{\"type\":\"scattercarpet\",\"marker\":{\"colorbar\":{\"outlinewidth\":0,\"ticks\":\"\"}}}],\"carpet\":[{\"aaxis\":{\"endlinecolor\":\"#2a3f5f\",\"gridcolor\":\"white\",\"linecolor\":\"white\",\"minorgridcolor\":\"white\",\"startlinecolor\":\"#2a3f5f\"},\"baxis\":{\"endlinecolor\":\"#2a3f5f\",\"gridcolor\":\"white\",\"linecolor\":\"white\",\"minorgridcolor\":\"white\",\"startlinecolor\":\"#2a3f5f\"},\"type\":\"carpet\"}],\"table\":[{\"cells\":{\"fill\":{\"color\":\"#EBF0F8\"},\"line\":{\"color\":\"white\"}},\"header\":{\"fill\":{\"color\":\"#C8D4E3\"},\"line\":{\"color\":\"white\"}},\"type\":\"table\"}],\"barpolar\":[{\"marker\":{\"line\":{\"color\":\"#E5ECF6\",\"width\":0.5},\"pattern\":{\"fillmode\":\"overlay\",\"size\":10,\"solidity\":0.2}},\"type\":\"barpolar\"}],\"pie\":[{\"automargin\":true,\"type\":\"pie\"}]},\"layout\":{\"autotypenumbers\":\"strict\",\"colorway\":[\"#636efa\",\"#EF553B\",\"#00cc96\",\"#ab63fa\",\"#FFA15A\",\"#19d3f3\",\"#FF6692\",\"#B6E880\",\"#FF97FF\",\"#FECB52\"],\"font\":{\"color\":\"#2a3f5f\"},\"hovermode\":\"closest\",\"hoverlabel\":{\"align\":\"left\"},\"paper_bgcolor\":\"white\",\"plot_bgcolor\":\"#E5ECF6\",\"polar\":{\"bgcolor\":\"#E5ECF6\",\"angularaxis\":{\"gridcolor\":\"white\",\"linecolor\":\"white\",\"ticks\":\"\"},\"radialaxis\":{\"gridcolor\":\"white\",\"linecolor\":\"white\",\"ticks\":\"\"}},\"ternary\":{\"bgcolor\":\"#E5ECF6\",\"aaxis\":{\"gridcolor\":\"white\",\"linecolor\":\"white\",\"ticks\":\"\"},\"baxis\":{\"gridcolor\":\"white\",\"linecolor\":\"white\",\"ticks\":\"\"},\"caxis\":{\"gridcolor\":\"white\",\"linecolor\":\"white\",\"ticks\":\"\"}},\"coloraxis\":{\"colorbar\":{\"outlinewidth\":0,\"ticks\":\"\"}},\"colorscale\":{\"sequential\":[[0.0,\"#0d0887\"],[0.1111111111111111,\"#46039f\"],[0.2222222222222222,\"#7201a8\"],[0.3333333333333333,\"#9c179e\"],[0.4444444444444444,\"#bd3786\"],[0.5555555555555556,\"#d8576b\"],[0.6666666666666666,\"#ed7953\"],[0.7777777777777778,\"#fb9f3a\"],[0.8888888888888888,\"#fdca26\"],[1.0,\"#f0f921\"]],\"sequentialminus\":[[0.0,\"#0d0887\"],[0.1111111111111111,\"#46039f\"],[0.2222222222222222,\"#7201a8\"],[0.3333333333333333,\"#9c179e\"],[0.4444444444444444,\"#bd3786\"],[0.5555555555555556,\"#d8576b\"],[0.6666666666666666,\"#ed7953\"],[0.7777777777777778,\"#fb9f3a\"],[0.8888888888888888,\"#fdca26\"],[1.0,\"#f0f921\"]],\"diverging\":[[0,\"#8e0152\"],[0.1,\"#c51b7d\"],[0.2,\"#de77ae\"],[0.3,\"#f1b6da\"],[0.4,\"#fde0ef\"],[0.5,\"#f7f7f7\"],[0.6,\"#e6f5d0\"],[0.7,\"#b8e186\"],[0.8,\"#7fbc41\"],[0.9,\"#4d9221\"],[1,\"#276419\"]]},\"xaxis\":{\"gridcolor\":\"white\",\"linecolor\":\"white\",\"ticks\":\"\",\"title\":{\"standoff\":15},\"zerolinecolor\":\"white\",\"automargin\":true,\"zerolinewidth\":2},\"yaxis\":{\"gridcolor\":\"white\",\"linecolor\":\"white\",\"ticks\":\"\",\"title\":{\"standoff\":15},\"zerolinecolor\":\"white\",\"automargin\":true,\"zerolinewidth\":2},\"scene\":{\"xaxis\":{\"backgroundcolor\":\"#E5ECF6\",\"gridcolor\":\"white\",\"linecolor\":\"white\",\"showbackground\":true,\"ticks\":\"\",\"zerolinecolor\":\"white\",\"gridwidth\":2},\"yaxis\":{\"backgroundcolor\":\"#E5ECF6\",\"gridcolor\":\"white\",\"linecolor\":\"white\",\"showbackground\":true,\"ticks\":\"\",\"zerolinecolor\":\"white\",\"gridwidth\":2},\"zaxis\":{\"backgroundcolor\":\"#E5ECF6\",\"gridcolor\":\"white\",\"linecolor\":\"white\",\"showbackground\":true,\"ticks\":\"\",\"zerolinecolor\":\"white\",\"gridwidth\":2}},\"shapedefaults\":{\"line\":{\"color\":\"#2a3f5f\"}},\"annotationdefaults\":{\"arrowcolor\":\"#2a3f5f\",\"arrowhead\":0,\"arrowwidth\":1},\"geo\":{\"bgcolor\":\"white\",\"landcolor\":\"#E5ECF6\",\"subunitcolor\":\"white\",\"showland\":true,\"showlakes\":true,\"lakecolor\":\"white\"},\"title\":{\"x\":0.05},\"mapbox\":{\"style\":\"light\"}}},\"title\":{\"text\":\"Financial Parameter Chart\"},\"xaxis\":{\"title\":{\"text\":\"Date\"}},\"yaxis\":{\"title\":{\"text\":\"Value\"}},\"legend\":{\"title\":{\"text\":\"Company - Parameter\"}}}}"
                        },
                        "financial_data": [
                            {
                                "company": "Infosys Limited",
                                "statement_type": "profit_and_loss",
                                "data": [
                                    {
                                        "id": 3398,
                                        "company_id": 27,
                                        "report_date": "2021-03-31",
                                        "parameter": "Depreciation",
                                        "value": 3267,
                                        "created_at": "2025-05-15T12:29:46.558731",
                                        "updated_at": "2025-05-22T09:27:45.213255"
                                    },
                                    {
                                        "id": 3403,
                                        "company_id": 27,
                                        "report_date": "2021-03-31",
                                        "parameter": "Dividend Amount",
                                        "value": 11469.6,
                                        "created_at": "2025-05-15T12:29:46.558731",
                                        "updated_at": "2025-05-22T09:27:45.213255"
                                    },
                                    {
                                        "id": 3394,
                                        "company_id": 27,
                                        "report_date": "2021-03-31",
                                        "parameter": "Employee Cost",
                                        "value": 55547,
                                        "created_at": "2025-05-15T12:29:46.558731",
                                        "updated_at": "2025-05-22T09:27:45.213255"
                                    },
                                    {
                                        "id": 3399,
                                        "company_id": 27,
                                        "report_date": "2021-03-31",
                                        "parameter": "Interest",
                                        "value": 195,
                                        "created_at": "2025-05-15T12:29:46.558731",
                                        "updated_at": "2025-05-22T09:27:45.213255"
                                    },
                                    {
                                        "id": 3402,
                                        "company_id": 27,
                                        "report_date": "2021-03-31",
                                        "parameter": "Net profit",
                                        "value": 19351,
                                        "created_at": "2025-05-15T12:29:46.558731",
                                        "updated_at": "2025-05-22T09:27:45.213255"
                                    },
                                    {
                                        "id": 3396,
                                        "company_id": 27,
                                        "report_date": "2021-03-31",
                                        "parameter": "Other Expenses",
                                        "value": 899,
                                        "created_at": "2025-05-15T12:29:46.558731",
                                        "updated_at": "2025-05-22T09:27:45.213255"
                                    },
                                    {
                                        "id": 3397,
                                        "company_id": 27,
                                        "report_date": "2021-03-31",
                                        "parameter": "Other Income",
                                        "value": 2201,
                                        "created_at": "2025-05-15T12:29:46.558731",
                                        "updated_at": "2025-05-22T09:27:45.213255"
                                    },
                                    {
                                        "id": 3393,
                                        "company_id": 27,
                                        "report_date": "2021-03-31",
                                        "parameter": "Other Mfr. Exp",
                                        "value": 12800,
                                        "created_at": "2025-05-15T12:29:46.558731",
                                        "updated_at": "2025-05-22T09:27:45.213255"
                                    },
                                    {
                                        "id": 3392,
                                        "company_id": 27,
                                        "report_date": "2021-03-31",
                                        "parameter": "Power and Fuel",
                                        "value": 143,
                                        "created_at": "2025-05-15T12:29:46.558731",
                                        "updated_at": "2025-05-22T09:27:45.213255"
                                    },
                                    {
                                        "id": 3400,
                                        "company_id": 27,
                                        "report_date": "2021-03-31",
                                        "parameter": "Profit before tax",
                                        "value": 26628,
                                        "created_at": "2025-05-15T12:29:46.558731",
                                        "updated_at": "2025-05-22T09:27:45.213255"
                                    },
                                    {
                                        "id": 3391,
                                        "company_id": 27,
                                        "report_date": "2021-03-31",
                                        "parameter": "Sales",
                                        "value": 100472,
                                        "created_at": "2025-05-15T12:29:46.558731",
                                        "updated_at": "2025-05-22T09:27:45.213255"
                                    },
                                    {
                                        "id": 3395,
                                        "company_id": 27,
                                        "report_date": "2021-03-31",
                                        "parameter": "Selling and admin",
                                        "value": 3194,
                                        "created_at": "2025-05-15T12:29:46.558731",
                                        "updated_at": "2025-05-22T09:27:45.213255"
                                    },
                                    {
                                        "id": 3401,
                                        "company_id": 27,
                                        "report_date": "2021-03-31",
                                        "parameter": "Tax",
                                        "value": 7205,
                                        "created_at": "2025-05-15T12:29:46.558731",
                                        "updated_at": "2025-05-22T09:27:45.213255"
                                    },
                                    {
                                        "id": 17797,
                                        "company_id": 127,
                                        "report_date": "2021-03-31",
                                        "parameter": "Employee Cost %",
                                        "value": 55,
                                        "created_at": "2025-05-15T12:29:46.558731",
                                        "updated_at": "2025-05-22T09:27:45.213255"
                                    },
                                    {
                                        "id": 17821,
                                        "company_id": 127,
                                        "report_date": "2021-03-31",
                                        "parameter": "Exceptional items",
                                        "value": 74,
                                        "created_at": "2025-05-15T12:29:46.558731",
                                        "updated_at": "2025-05-22T09:27:45.213255"
                                    },
                                    {
                                        "id": 17905,
                                        "company_id": 127,
                                        "report_date": "2021-03-31",
                                        "parameter": "Exceptional items AT",
                                        "value": 54,
                                        "created_at": "2025-05-15T12:29:46.558731",
                                        "updated_at": "2025-05-22T09:27:45.213255"
                                    },
                                    {
                                        "id": 17785,
                                        "company_id": 127,
                                        "report_date": "2021-03-31",
                                        "parameter": "Manufacturing Cost %",
                                        "value": 13,
                                        "created_at": "2025-05-15T12:29:46.558731",
                                        "updated_at": "2025-05-22T09:27:45.213255"
                                    },
                                    {
                                        "id": 17881,
                                        "company_id": 127,
                                        "report_date": "2021-03-31",
                                        "parameter": "Minority share",
                                        "value": -72,
                                        "created_at": "2025-05-15T12:29:46.558731",
                                        "updated_at": "2025-05-22T09:27:45.213255"
                                    },
                                    {
                                        "id": 17809,
                                        "company_id": 127,
                                        "report_date": "2021-03-31",
                                        "parameter": "Other Cost %",
                                        "value": 4,
                                        "created_at": "2025-05-15T12:29:46.558731",
                                        "updated_at": "2025-05-22T09:27:45.213255"
                                    },
                                    {
                                        "id": 17833,
                                        "company_id": 127,
                                        "report_date": "2021-03-31",
                                        "parameter": "Other income normal",
                                        "value": 2127,
                                        "created_at": "2025-05-15T12:29:46.558731",
                                        "updated_at": "2025-05-22T09:27:45.213255"
                                    },
                                    {
                                        "id": 17845,
                                        "company_id": 127,
                                        "report_date": "2021-03-31",
                                        "parameter": "Profit after tax",
                                        "value": 19423,
                                        "created_at": "2025-05-15T12:29:46.558731",
                                        "updated_at": "2025-05-22T09:27:45.213255"
                                    },
                                    {
                                        "id": 17893,
                                        "company_id": 127,
                                        "report_date": "2021-03-31",
                                        "parameter": "Profit for EPS",
                                        "value": 19351,
                                        "created_at": "2025-05-15T12:29:46.558731",
                                        "updated_at": "2025-05-22T09:27:45.213255"
                                    },
                                    {
                                        "id": 17917,
                                        "company_id": 127,
                                        "report_date": "2021-03-31",
                                        "parameter": "Profit for PE",
                                        "value": 19297,
                                        "created_at": "2025-05-15T12:29:46.558731",
                                        "updated_at": "2025-05-22T09:27:45.213255"
                                    },
                                    {
                                        "id": 17857,
                                        "company_id": 127,
                                        "report_date": "2021-03-31",
                                        "parameter": "Profit from Associates",
                                        "value": 0,
                                        "created_at": "2025-05-15T12:29:46.558731",
                                        "updated_at": "2025-05-22T09:27:45.213255"
                                    },
                                    {
                                        "id": 17869,
                                        "company_id": 127,
                                        "report_date": "2021-03-31",
                                        "parameter": "Reported Net Profit",
                                        "value": 19423,
                                        "created_at": "2025-05-15T12:29:46.558731",
                                        "updated_at": "2025-05-22T09:27:45.213255"
                                    },
                                    {
                                        "id": 17773,
                                        "company_id": 127,
                                        "report_date": "2021-03-31",
                                        "parameter": "Sales Growth %",
                                        "value": 10.66,
                                        "created_at": "2025-05-15T12:29:46.558731",
                                        "updated_at": "2025-05-22T09:27:45.213255"
                                    },
                                    {
                                        "id": 3414,
                                        "company_id": 27,
                                        "report_date": "2022-03-31",
                                        "parameter": "Tax",
                                        "value": 7964,
                                        "created_at": "2025-05-15T12:29:46.558731",
                                        "updated_at": "2025-05-22T09:27:45.213255"
                                    },
                                    {
                                        "id": 17798,
                                        "company_id": 127,
                                        "report_date": "2022-03-31",
                                        "parameter": "Employee Cost %",
                                        "value": 53,
                                        "created_at": "2025-05-15T12:29:46.558731",
                                        "updated_at": "2025-05-22T09:27:45.213255"
                                    },
                                    {
                                        "id": 17822,
                                        "company_id": 127,
                                        "report_date": "2022-03-31",
                                        "parameter": "Exceptional items",
                                        "value": 177,
                                        "created_at": "2025-05-15T12:29:46.558731",
                                        "updated_at": "2025-05-22T09:27:45.213255"
                                    },
                                    {
                                        "id": 17906,
                                        "company_id": 127,
                                        "report_date": "2022-03-31",
                                        "parameter": "Exceptional items AT",
                                        "value": 130,
                                        "created_at": "2025-05-15T12:29:46.558731",
                                        "updated_at": "2025-05-22T09:27:45.213255"
                                    },
                                    {
                                        "id": 17786,
                                        "company_id": 127,
                                        "report_date": "2022-03-31",
                                        "parameter": "Manufacturing Cost %",
                                        "value": 17,
                                        "created_at": "2025-05-15T12:29:46.558731",
                                        "updated_at": "2025-05-22T09:27:45.213255"
                                    },
                                    {
                                        "id": 17882,
                                        "company_id": 127,
                                        "report_date": "2022-03-31",
                                        "parameter": "Minority share",
                                        "value": -36,
                                        "created_at": "2025-05-15T12:29:46.558731",
                                        "updated_at": "2025-05-22T09:27:45.213255"
                                    },
                                    {
                                        "id": 17810,
                                        "company_id": 127,
                                        "report_date": "2022-03-31",
                                        "parameter": "Other Cost %",
                                        "value": 4,
                                        "created_at": "2025-05-15T12:29:46.558731",
                                        "updated_at": "2025-05-22T09:27:45.213255"
                                    },
                                    {
                                        "id": 17834,
                                        "company_id": 127,
                                        "report_date": "2022-03-31",
                                        "parameter": "Other income normal",
                                        "value": 2118,
                                        "created_at": "2025-05-15T12:29:46.558731",
                                        "updated_at": "2025-05-22T09:27:45.213255"
                                    },
                                    {
                                        "id": 17846,
                                        "company_id": 127,
                                        "report_date": "2022-03-31",
                                        "parameter": "Profit after tax",
                                        "value": 22146,
                                        "created_at": "2025-05-15T12:29:46.558731",
                                        "updated_at": "2025-05-22T09:27:45.213255"
                                    },
                                    {
                                        "id": 17894,
                                        "company_id": 127,
                                        "report_date": "2022-03-31",
                                        "parameter": "Profit for EPS",
                                        "value": 22110,
                                        "created_at": "2025-05-15T12:29:46.558731",
                                        "updated_at": "2025-05-22T09:27:45.213255"
                                    },
                                    {
                                        "id": 17918,
                                        "company_id": 127,
                                        "report_date": "2022-03-31",
                                        "parameter": "Profit for PE",
                                        "value": 21980,
                                        "created_at": "2025-05-15T12:29:46.558731",
                                        "updated_at": "2025-05-22T09:27:45.213255"
                                    },
                                    {
                                        "id": 17858,
                                        "company_id": 127,
                                        "report_date": "2022-03-31",
                                        "parameter": "Profit from Associates",
                                        "value": 0,
                                        "created_at": "2025-05-15T12:29:46.558731",
                                        "updated_at": "2025-05-22T09:27:45.213255"
                                    },
                                    {
                                        "id": 17870,
                                        "company_id": 127,
                                        "report_date": "2022-03-31",
                                        "parameter": "Reported Net Profit",
                                        "value": 22146,
                                        "created_at": "2025-05-15T12:29:46.558731",
                                        "updated_at": "2025-05-22T09:27:45.213255"
                                    },
                                    {
                                        "id": 17774,
                                        "company_id": 127,
                                        "report_date": "2022-03-31",
                                        "parameter": "Sales Growth %",
                                        "value": 21.07,
                                        "created_at": "2025-05-15T12:29:46.558731",
                                        "updated_at": "2025-05-22T09:27:45.213255"
                                    },
                                    {
                                        "id": 3411,
                                        "company_id": 27,
                                        "report_date": "2022-03-31",
                                        "parameter": "Depreciation",
                                        "value": 3476,
                                        "created_at": "2025-05-15T12:29:46.558731",
                                        "updated_at": "2025-05-22T09:27:45.213255"
                                    },
                                    {
                                        "id": 3416,
                                        "company_id": 27,
                                        "report_date": "2022-03-31",
                                        "parameter": "Dividend Amount",
                                        "value": 13007.6,
                                        "created_at": "2025-05-15T12:29:46.558731",
                                        "updated_at": "2025-05-22T09:27:45.213255"
                                    },
                                    {
                                        "id": 3407,
                                        "company_id": 27,
                                        "report_date": "2022-03-31",
                                        "parameter": "Employee Cost",
                                        "value": 63997,
                                        "created_at": "2025-05-15T12:29:46.558731",
                                        "updated_at": "2025-05-22T09:27:45.213255"
                                    },
                                    {
                                        "id": 3412,
                                        "company_id": 27,
                                        "report_date": "2022-03-31",
                                        "parameter": "Interest",
                                        "value": 200,
                                        "created_at": "2025-05-15T12:29:46.558731",
                                        "updated_at": "2025-05-22T09:27:45.213255"
                                    },
                                    {
                                        "id": 3415,
                                        "company_id": 27,
                                        "report_date": "2022-03-31",
                                        "parameter": "Net profit",
                                        "value": 22110,
                                        "created_at": "2025-05-15T12:29:46.558731",
                                        "updated_at": "2025-05-22T09:27:45.213255"
                                    },
                                    {
                                        "id": 3409,
                                        "company_id": 27,
                                        "report_date": "2022-03-31",
                                        "parameter": "Other Expenses",
                                        "value": 1026,
                                        "created_at": "2025-05-15T12:29:46.558731",
                                        "updated_at": "2025-05-22T09:27:45.213255"
                                    },
                                    {
                                        "id": 3410,
                                        "company_id": 27,
                                        "report_date": "2022-03-31",
                                        "parameter": "Other Income",
                                        "value": 2295,
                                        "created_at": "2025-05-15T12:29:46.558731",
                                        "updated_at": "2025-05-22T09:27:45.213255"
                                    },
                                    {
                                        "id": 3406,
                                        "company_id": 27,
                                        "report_date": "2022-03-31",
                                        "parameter": "Other Mfr. Exp",
                                        "value": 20690,
                                        "created_at": "2025-05-15T12:29:46.558731",
                                        "updated_at": "2025-05-22T09:27:45.213255"
                                    },
                                    {
                                        "id": 3405,
                                        "company_id": 27,
                                        "report_date": "2022-03-31",
                                        "parameter": "Power and Fuel",
                                        "value": 132,
                                        "created_at": "2025-05-15T12:29:46.558731",
                                        "updated_at": "2025-05-22T09:27:45.213255"
                                    },
                                    {
                                        "id": 3413,
                                        "company_id": 27,
                                        "report_date": "2022-03-31",
                                        "parameter": "Profit before tax",
                                        "value": 30110,
                                        "created_at": "2025-05-15T12:29:46.558731",
                                        "updated_at": "2025-05-22T09:27:45.213255"
                                    },
                                    {
                                        "id": 3404,
                                        "company_id": 27,
                                        "report_date": "2022-03-31",
                                        "parameter": "Sales",
                                        "value": 121641,
                                        "created_at": "2025-05-15T12:29:46.558731",
                                        "updated_at": "2025-05-22T09:27:45.213255"
                                    },
                                    {
                                        "id": 3408,
                                        "company_id": 27,
                                        "report_date": "2022-03-31",
                                        "parameter": "Selling and admin",
                                        "value": 4305,
                                        "created_at": "2025-05-15T12:29:46.558731",
                                        "updated_at": "2025-05-22T09:27:45.213255"
                                    },
                                    {
                                        "id": 3424,
                                        "company_id": 27,
                                        "report_date": "2023-03-31",
                                        "parameter": "Depreciation",
                                        "value": 4225,
                                        "created_at": "2025-05-15T12:29:46.558731",
                                        "updated_at": "2025-05-22T09:27:45.213255"
                                    },
                                    {
                                        "id": 3429,
                                        "company_id": 27,
                                        "report_date": "2023-03-31",
                                        "parameter": "Dividend Amount",
                                        "value": 14069.2,
                                        "created_at": "2025-05-15T12:29:46.558731",
                                        "updated_at": "2025-05-22T09:27:45.213255"
                                    },
                                    {
                                        "id": 3420,
                                        "company_id": 27,
                                        "report_date": "2023-03-31",
                                        "parameter": "Employee Cost",
                                        "value": 78374,
                                        "created_at": "2025-05-15T12:29:46.558731",
                                        "updated_at": "2025-05-22T09:27:45.213255"
                                    },
                                    {
                                        "id": 3425,
                                        "company_id": 27,
                                        "report_date": "2023-03-31",
                                        "parameter": "Interest",
                                        "value": 284,
                                        "created_at": "2025-05-15T12:29:46.558731",
                                        "updated_at": "2025-05-22T09:27:45.213255"
                                    },
                                    {
                                        "id": 3428,
                                        "company_id": 27,
                                        "report_date": "2023-03-31",
                                        "parameter": "Net profit",
                                        "value": 24095,
                                        "created_at": "2025-05-15T12:29:46.558731",
                                        "updated_at": "2025-05-22T09:27:45.213255"
                                    },
                                    {
                                        "id": 3422,
                                        "company_id": 27,
                                        "report_date": "2023-03-31",
                                        "parameter": "Other Expenses",
                                        "value": 1457,
                                        "created_at": "2025-05-15T12:29:46.558731",
                                        "updated_at": "2025-05-22T09:27:45.213255"
                                    },
                                    {
                                        "id": 3423,
                                        "company_id": 27,
                                        "report_date": "2023-03-31",
                                        "parameter": "Other Income",
                                        "value": 2701,
                                        "created_at": "2025-05-15T12:29:46.558731",
                                        "updated_at": "2025-05-22T09:27:45.213255"
                                    },
                                    {
                                        "id": 3419,
                                        "company_id": 27,
                                        "report_date": "2023-03-31",
                                        "parameter": "Other Mfr. Exp",
                                        "value": 26330,
                                        "created_at": "2025-05-15T12:29:46.558731",
                                        "updated_at": "2025-05-22T09:27:45.213255"
                                    },
                                    {
                                        "id": 3418,
                                        "company_id": 27,
                                        "report_date": "2023-03-31",
                                        "parameter": "Power and Fuel",
                                        "value": 176,
                                        "created_at": "2025-05-15T12:29:46.558731",
                                        "updated_at": "2025-05-22T09:27:45.213255"
                                    },
                                    {
                                        "id": 3426,
                                        "company_id": 27,
                                        "report_date": "2023-03-31",
                                        "parameter": "Profit before tax",
                                        "value": 33322,
                                        "created_at": "2025-05-15T12:29:46.558731",
                                        "updated_at": "2025-05-22T09:27:45.213255"
                                    },
                                    {
                                        "id": 3417,
                                        "company_id": 27,
                                        "report_date": "2023-03-31",
                                        "parameter": "Sales",
                                        "value": 146767,
                                        "created_at": "2025-05-15T12:29:46.558731",
                                        "updated_at": "2025-05-22T09:27:45.213255"
                                    },
                                    {
                                        "id": 3421,
                                        "company_id": 27,
                                        "report_date": "2023-03-31",
                                        "parameter": "Selling and admin",
                                        "value": 5300,
                                        "created_at": "2025-05-15T12:29:46.558731",
                                        "updated_at": "2025-05-22T09:27:45.213255"
                                    },
                                    {
                                        "id": 3427,
                                        "company_id": 27,
                                        "report_date": "2023-03-31",
                                        "parameter": "Tax",
                                        "value": 9214,
                                        "created_at": "2025-05-15T12:29:46.558731",
                                        "updated_at": "2025-05-22T09:27:45.213255"
                                    },
                                    {
                                        "id": 17799,
                                        "company_id": 127,
                                        "report_date": "2023-03-31",
                                        "parameter": "Employee Cost %",
                                        "value": 53,
                                        "created_at": "2025-05-15T12:29:46.558731",
                                        "updated_at": "2025-05-22T09:27:45.213255"
                                    },
                                    {
                                        "id": 17823,
                                        "company_id": 127,
                                        "report_date": "2023-03-31",
                                        "parameter": "Exceptional items",
                                        "value": 148,
                                        "created_at": "2025-05-15T12:29:46.558731",
                                        "updated_at": "2025-05-22T09:27:45.213255"
                                    },
                                    {
                                        "id": 17907,
                                        "company_id": 127,
                                        "report_date": "2023-03-31",
                                        "parameter": "Exceptional items AT",
                                        "value": 107,
                                        "created_at": "2025-05-15T12:29:46.558731",
                                        "updated_at": "2025-05-22T09:27:45.213255"
                                    },
                                    {
                                        "id": 17787,
                                        "company_id": 127,
                                        "report_date": "2023-03-31",
                                        "parameter": "Manufacturing Cost %",
                                        "value": 18,
                                        "created_at": "2025-05-15T12:29:46.558731",
                                        "updated_at": "2025-05-22T09:27:45.213255"
                                    },
                                    {
                                        "id": 17883,
                                        "company_id": 127,
                                        "report_date": "2023-03-31",
                                        "parameter": "Minority share",
                                        "value": -13,
                                        "created_at": "2025-05-15T12:29:46.558731",
                                        "updated_at": "2025-05-22T09:27:45.213255"
                                    },
                                    {
                                        "id": 17811,
                                        "company_id": 127,
                                        "report_date": "2023-03-31",
                                        "parameter": "Other Cost %",
                                        "value": 5,
                                        "created_at": "2025-05-15T12:29:46.558731",
                                        "updated_at": "2025-05-22T09:27:45.213255"
                                    },
                                    {
                                        "id": 17835,
                                        "company_id": 127,
                                        "report_date": "2023-03-31",
                                        "parameter": "Other income normal",
                                        "value": 2553,
                                        "created_at": "2025-05-15T12:29:46.558731",
                                        "updated_at": "2025-05-22T09:27:45.213255"
                                    },
                                    {
                                        "id": 17847,
                                        "company_id": 127,
                                        "report_date": "2023-03-31",
                                        "parameter": "Profit after tax",
                                        "value": 24108,
                                        "created_at": "2025-05-15T12:29:46.558731",
                                        "updated_at": "2025-05-22T09:27:45.213255"
                                    },
                                    {
                                        "id": 17895,
                                        "company_id": 127,
                                        "report_date": "2023-03-31",
                                        "parameter": "Profit for EPS",
                                        "value": 24095,
                                        "created_at": "2025-05-15T12:29:46.558731",
                                        "updated_at": "2025-05-22T09:27:45.213255"
                                    },
                                    {
                                        "id": 17919,
                                        "company_id": 127,
                                        "report_date": "2023-03-31",
                                        "parameter": "Profit for PE",
                                        "value": 23988,
                                        "created_at": "2025-05-15T12:29:46.558731",
                                        "updated_at": "2025-05-22T09:27:45.213255"
                                    },
                                    {
                                        "id": 17859,
                                        "company_id": 127,
                                        "report_date": "2023-03-31",
                                        "parameter": "Profit from Associates",
                                        "value": 0,
                                        "created_at": "2025-05-15T12:29:46.558731",
                                        "updated_at": "2025-05-22T09:27:45.213255"
                                    },
                                    {
                                        "id": 17871,
                                        "company_id": 127,
                                        "report_date": "2023-03-31",
                                        "parameter": "Reported Net Profit",
                                        "value": 24108,
                                        "created_at": "2025-05-15T12:29:46.558731",
                                        "updated_at": "2025-05-22T09:27:45.213255"
                                    },
                                    {
                                        "id": 17775,
                                        "company_id": 127,
                                        "report_date": "2023-03-31",
                                        "parameter": "Sales Growth %",
                                        "value": 20.66,
                                        "created_at": "2025-05-15T12:29:46.558731",
                                        "updated_at": "2025-05-22T09:27:45.213255"
                                    }
                                ]
                            },
                            {
                                "company": "Mahindra & Mahindra",
                                "statement_type": "profit_and_loss",
                                "data": [
                                    {
                                        "id": 19927,
                                        "company_id": 141,
                                        "report_date": "2021-03-31",
                                        "parameter": "Sales Growth %",
                                        "value": -1.46,
                                        "created_at": "2025-05-15T12:29:46.558731",
                                        "updated_at": "2025-05-22T09:27:45.213255"
                                    },
                                    {
                                        "id": 6254,
                                        "company_id": 47,
                                        "report_date": "2021-03-31",
                                        "parameter": "Depreciation",
                                        "value": 3378.11,
                                        "created_at": "2025-05-15T12:29:46.558731",
                                        "updated_at": "2025-05-22T09:27:45.213255"
                                    },
                                    {
                                        "id": 6259,
                                        "company_id": 47,
                                        "report_date": "2021-03-31",
                                        "parameter": "Dividend Amount",
                                        "value": 971.51,
                                        "created_at": "2025-05-15T12:29:46.558731",
                                        "updated_at": "2025-05-22T09:27:45.213255"
                                    },
                                    {
                                        "id": 6250,
                                        "company_id": 47,
                                        "report_date": "2021-03-31",
                                        "parameter": "Employee Cost",
                                        "value": 7813.26,
                                        "created_at": "2025-05-15T12:29:46.558731",
                                        "updated_at": "2025-05-22T09:27:45.213255"
                                    },
                                    {
                                        "id": 6255,
                                        "company_id": 47,
                                        "report_date": "2021-03-31",
                                        "parameter": "Interest",
                                        "value": 6102.22,
                                        "created_at": "2025-05-15T12:29:46.558731",
                                        "updated_at": "2025-05-22T09:27:45.213255"
                                    },
                                    {
                                        "id": 6258,
                                        "company_id": 47,
                                        "report_date": "2021-03-31",
                                        "parameter": "Net profit",
                                        "value": 1812.49,
                                        "created_at": "2025-05-15T12:29:46.558731",
                                        "updated_at": "2025-05-22T09:27:45.213255"
                                    },
                                    {
                                        "id": 6252,
                                        "company_id": 47,
                                        "report_date": "2021-03-31",
                                        "parameter": "Other Expenses",
                                        "value": 8989,
                                        "created_at": "2025-05-15T12:29:46.558731",
                                        "updated_at": "2025-05-22T09:27:45.213255"
                                    },
                                    {
                                        "id": 6253,
                                        "company_id": 47,
                                        "report_date": "2021-03-31",
                                        "parameter": "Other Income",
                                        "value": 1151.51,
                                        "created_at": "2025-05-15T12:29:46.558731",
                                        "updated_at": "2025-05-22T09:27:45.213255"
                                    },
                                    {
                                        "id": 6249,
                                        "company_id": 47,
                                        "report_date": "2021-03-31",
                                        "parameter": "Other Mfr. Exp",
                                        "value": 2523.4,
                                        "created_at": "2025-05-15T12:29:46.558731",
                                        "updated_at": "2025-05-22T09:27:45.213255"
                                    },
                                    {
                                        "id": 6248,
                                        "company_id": 47,
                                        "report_date": "2021-03-31",
                                        "parameter": "Power and Fuel",
                                        "value": 429.56,
                                        "created_at": "2025-05-15T12:29:46.558731",
                                        "updated_at": "2025-05-22T09:27:45.213255"
                                    },
                                    {
                                        "id": 6256,
                                        "company_id": 47,
                                        "report_date": "2021-03-31",
                                        "parameter": "Profit before tax",
                                        "value": 3158.2,
                                        "created_at": "2025-05-15T12:29:46.558731",
                                        "updated_at": "2025-05-22T09:27:45.213255"
                                    },
                                    {
                                        "id": 6246,
                                        "company_id": 47,
                                        "report_date": "2021-03-31",
                                        "parameter": "Raw Material Cost",
                                        "value": 38271.2,
                                        "created_at": "2025-05-15T12:29:46.558731",
                                        "updated_at": "2025-05-22T09:27:45.213255"
                                    },
                                    {
                                        "id": 6245,
                                        "company_id": 47,
                                        "report_date": "2021-03-31",
                                        "parameter": "Sales",
                                        "value": 74277.78,
                                        "created_at": "2025-05-15T12:29:46.558731",
                                        "updated_at": "2025-05-22T09:27:45.213255"
                                    },
                                    {
                                        "id": 6251,
                                        "company_id": 47,
                                        "report_date": "2021-03-31",
                                        "parameter": "Selling and admin",
                                        "value": 4628.75,
                                        "created_at": "2025-05-15T12:29:46.558731",
                                        "updated_at": "2025-05-22T09:27:45.213255"
                                    },
                                    {
                                        "id": 6257,
                                        "company_id": 47,
                                        "report_date": "2021-03-31",
                                        "parameter": "Tax",
                                        "value": 1645.81,
                                        "created_at": "2025-05-15T12:29:46.558731",
                                        "updated_at": "2025-05-22T09:27:45.213255"
                                    },
                                    {
                                        "id": 6247,
                                        "company_id": 47,
                                        "report_date": "2021-03-31",
                                        "parameter": "Change in Inventory",
                                        "value": -135.59,
                                        "created_at": "2025-05-15T12:29:46.558731",
                                        "updated_at": "2025-05-22T09:27:45.213255"
                                    },
                                    {
                                        "id": 19963,
                                        "company_id": 141,
                                        "report_date": "2021-03-31",
                                        "parameter": "Employee Cost %",
                                        "value": 11,
                                        "created_at": "2025-05-15T12:29:46.558731",
                                        "updated_at": "2025-05-22T09:27:45.213255"
                                    },
                                    {
                                        "id": 19987,
                                        "company_id": 141,
                                        "report_date": "2021-03-31",
                                        "parameter": "Exceptional items",
                                        "value": -1158,
                                        "created_at": "2025-05-15T12:29:46.558731",
                                        "updated_at": "2025-05-22T09:27:45.213255"
                                    },
                                    {
                                        "id": 20071,
                                        "company_id": 141,
                                        "report_date": "2021-03-31",
                                        "parameter": "Exceptional items AT",
                                        "value": -419,
                                        "created_at": "2025-05-15T12:29:46.558731",
                                        "updated_at": "2025-05-22T09:27:45.213255"
                                    },
                                    {
                                        "id": 19951,
                                        "company_id": 141,
                                        "report_date": "2021-03-31",
                                        "parameter": "Manufacturing Cost %",
                                        "value": 4,
                                        "created_at": "2025-05-15T12:29:46.558731",
                                        "updated_at": "2025-05-22T09:27:45.213255"
                                    },
                                    {
                                        "id": 19939,
                                        "company_id": 141,
                                        "report_date": "2021-03-31",
                                        "parameter": "Material Cost %",
                                        "value": 52,
                                        "created_at": "2025-05-15T12:29:46.558731",
                                        "updated_at": "2025-05-22T09:27:45.213255"
                                    },
                                    {
                                        "id": 20047,
                                        "company_id": 141,
                                        "report_date": "2021-03-31",
                                        "parameter": "Minority share",
                                        "value": 300,
                                        "created_at": "2025-05-15T12:29:46.558731",
                                        "updated_at": "2025-05-22T09:27:45.213255"
                                    },
                                    {
                                        "id": 19975,
                                        "company_id": 141,
                                        "report_date": "2021-03-31",
                                        "parameter": "Other Cost %",
                                        "value": 18,
                                        "created_at": "2025-05-15T12:29:46.558731",
                                        "updated_at": "2025-05-22T09:27:45.213255"
                                    },
                                    {
                                        "id": 19999,
                                        "company_id": 141,
                                        "report_date": "2021-03-31",
                                        "parameter": "Other income normal",
                                        "value": 2310,
                                        "created_at": "2025-05-15T12:29:46.558731",
                                        "updated_at": "2025-05-22T09:27:45.213255"
                                    },
                                    {
                                        "id": 20011,
                                        "company_id": 141,
                                        "report_date": "2021-03-31",
                                        "parameter": "Profit after tax",
                                        "value": 1512,
                                        "created_at": "2025-05-15T12:29:46.558731",
                                        "updated_at": "2025-05-22T09:27:45.213255"
                                    },
                                    {
                                        "id": 20059,
                                        "company_id": 141,
                                        "report_date": "2021-03-31",
                                        "parameter": "Profit for EPS",
                                        "value": 1812,
                                        "created_at": "2025-05-15T12:29:46.558731",
                                        "updated_at": "2025-05-22T09:27:45.213255"
                                    },
                                    {
                                        "id": 20083,
                                        "company_id": 141,
                                        "report_date": "2021-03-31",
                                        "parameter": "Profit for PE",
                                        "value": 1932,
                                        "created_at": "2025-05-15T12:29:46.558731",
                                        "updated_at": "2025-05-22T09:27:45.213255"
                                    },
                                    {
                                        "id": 20023,
                                        "company_id": 141,
                                        "report_date": "2021-03-31",
                                        "parameter": "Profit from Associates",
                                        "value": 0,
                                        "created_at": "2025-05-15T12:29:46.558731",
                                        "updated_at": "2025-05-22T09:27:45.213255"
                                    },
                                    {
                                        "id": 20035,
                                        "company_id": 141,
                                        "report_date": "2021-03-31",
                                        "parameter": "Reported Net Profit",
                                        "value": 1512,
                                        "created_at": "2025-05-15T12:29:46.558731",
                                        "updated_at": "2025-05-22T09:27:45.213255"
                                    },
                                    {
                                        "id": 6272,
                                        "company_id": 47,
                                        "report_date": "2022-03-31",
                                        "parameter": "Tax",
                                        "value": 2108.76,
                                        "created_at": "2025-05-15T12:29:46.558731",
                                        "updated_at": "2025-05-22T09:27:45.213255"
                                    },
                                    {
                                        "id": 19964,
                                        "company_id": 141,
                                        "report_date": "2022-03-31",
                                        "parameter": "Employee Cost %",
                                        "value": 9,
                                        "created_at": "2025-05-15T12:29:46.558731",
                                        "updated_at": "2025-05-22T09:27:45.213255"
                                    },
                                    {
                                        "id": 19988,
                                        "company_id": 141,
                                        "report_date": "2022-03-31",
                                        "parameter": "Exceptional items",
                                        "value": 414,
                                        "created_at": "2025-05-15T12:29:46.558731",
                                        "updated_at": "2025-05-22T09:27:45.213255"
                                    },
                                    {
                                        "id": 20072,
                                        "company_id": 141,
                                        "report_date": "2022-03-31",
                                        "parameter": "Exceptional items AT",
                                        "value": 321,
                                        "created_at": "2025-05-15T12:29:46.558731",
                                        "updated_at": "2025-05-22T09:27:45.213255"
                                    },
                                    {
                                        "id": 19952,
                                        "company_id": 141,
                                        "report_date": "2022-03-31",
                                        "parameter": "Manufacturing Cost %",
                                        "value": 4,
                                        "created_at": "2025-05-15T12:29:46.558731",
                                        "updated_at": "2025-05-22T09:27:45.213255"
                                    },
                                    {
                                        "id": 19940,
                                        "company_id": 141,
                                        "report_date": "2022-03-31",
                                        "parameter": "Material Cost %",
                                        "value": 57,
                                        "created_at": "2025-05-15T12:29:46.558731",
                                        "updated_at": "2025-05-22T09:27:45.213255"
                                    },
                                    {
                                        "id": 20048,
                                        "company_id": 141,
                                        "report_date": "2022-03-31",
                                        "parameter": "Minority share",
                                        "value": -676,
                                        "created_at": "2025-05-15T12:29:46.558731",
                                        "updated_at": "2025-05-22T09:27:45.213255"
                                    },
                                    {
                                        "id": 19976,
                                        "company_id": 141,
                                        "report_date": "2022-03-31",
                                        "parameter": "Other Cost %",
                                        "value": 13,
                                        "created_at": "2025-05-15T12:29:46.558731",
                                        "updated_at": "2025-05-22T09:27:45.213255"
                                    },
                                    {
                                        "id": 20000,
                                        "company_id": 141,
                                        "report_date": "2022-03-31",
                                        "parameter": "Other income normal",
                                        "value": 2790,
                                        "created_at": "2025-05-15T12:29:46.558731",
                                        "updated_at": "2025-05-22T09:27:45.213255"
                                    },
                                    {
                                        "id": 20012,
                                        "company_id": 141,
                                        "report_date": "2022-03-31",
                                        "parameter": "Profit after tax",
                                        "value": 7253,
                                        "created_at": "2025-05-15T12:29:46.558731",
                                        "updated_at": "2025-05-22T09:27:45.213255"
                                    },
                                    {
                                        "id": 20060,
                                        "company_id": 141,
                                        "report_date": "2022-03-31",
                                        "parameter": "Profit for EPS",
                                        "value": 6577,
                                        "created_at": "2025-05-15T12:29:46.558731",
                                        "updated_at": "2025-05-22T09:27:45.213255"
                                    },
                                    {
                                        "id": 20084,
                                        "company_id": 141,
                                        "report_date": "2022-03-31",
                                        "parameter": "Profit for PE",
                                        "value": 6286,
                                        "created_at": "2025-05-15T12:29:46.558731",
                                        "updated_at": "2025-05-22T09:27:45.213255"
                                    },
                                    {
                                        "id": 20024,
                                        "company_id": 141,
                                        "report_date": "2022-03-31",
                                        "parameter": "Profit from Associates",
                                        "value": 0,
                                        "created_at": "2025-05-15T12:29:46.558731",
                                        "updated_at": "2025-05-22T09:27:45.213255"
                                    },
                                    {
                                        "id": 20036,
                                        "company_id": 141,
                                        "report_date": "2022-03-31",
                                        "parameter": "Reported Net Profit",
                                        "value": 7253,
                                        "created_at": "2025-05-15T12:29:46.558731",
                                        "updated_at": "2025-05-22T09:27:45.213255"
                                    },
                                    {
                                        "id": 19928,
                                        "company_id": 141,
                                        "report_date": "2022-03-31",
                                        "parameter": "Sales Growth %",
                                        "value": 21.4,
                                        "created_at": "2025-05-15T12:29:46.558731",
                                        "updated_at": "2025-05-22T09:27:45.213255"
                                    },
                                    {
                                        "id": 6269,
                                        "company_id": 47,
                                        "report_date": "2022-03-31",
                                        "parameter": "Depreciation",
                                        "value": 3507.5,
                                        "created_at": "2025-05-15T12:29:46.558731",
                                        "updated_at": "2025-05-22T09:27:45.213255"
                                    },
                                    {
                                        "id": 6274,
                                        "company_id": 47,
                                        "report_date": "2022-03-31",
                                        "parameter": "Dividend Amount",
                                        "value": 1284.5,
                                        "created_at": "2025-05-15T12:29:46.558731",
                                        "updated_at": "2025-05-22T09:27:45.213255"
                                    },
                                    {
                                        "id": 6265,
                                        "company_id": 47,
                                        "report_date": "2022-03-31",
                                        "parameter": "Employee Cost",
                                        "value": 8386.74,
                                        "created_at": "2025-05-15T12:29:46.558731",
                                        "updated_at": "2025-05-22T09:27:45.213255"
                                    },
                                    {
                                        "id": 6270,
                                        "company_id": 47,
                                        "report_date": "2022-03-31",
                                        "parameter": "Interest",
                                        "value": 5018.05,
                                        "created_at": "2025-05-15T12:29:46.558731",
                                        "updated_at": "2025-05-22T09:27:45.213255"
                                    },
                                    {
                                        "id": 6273,
                                        "company_id": 47,
                                        "report_date": "2022-03-31",
                                        "parameter": "Net profit",
                                        "value": 6577.32,
                                        "created_at": "2025-05-15T12:29:46.558731",
                                        "updated_at": "2025-05-22T09:27:45.213255"
                                    },
                                    {
                                        "id": 6267,
                                        "company_id": 47,
                                        "report_date": "2022-03-31",
                                        "parameter": "Other Expenses",
                                        "value": 5654.58,
                                        "created_at": "2025-05-15T12:29:46.558731",
                                        "updated_at": "2025-05-22T09:27:45.213255"
                                    },
                                    {
                                        "id": 6268,
                                        "company_id": 47,
                                        "report_date": "2022-03-31",
                                        "parameter": "Other Income",
                                        "value": 3204.47,
                                        "created_at": "2025-05-15T12:29:46.558731",
                                        "updated_at": "2025-05-22T09:27:45.213255"
                                    },
                                    {
                                        "id": 6264,
                                        "company_id": 47,
                                        "report_date": "2022-03-31",
                                        "parameter": "Other Mfr. Exp",
                                        "value": 3124.27,
                                        "created_at": "2025-05-15T12:29:46.558731",
                                        "updated_at": "2025-05-22T09:27:45.213255"
                                    },
                                    {
                                        "id": 6263,
                                        "company_id": 47,
                                        "report_date": "2022-03-31",
                                        "parameter": "Power and Fuel",
                                        "value": 541.27,
                                        "created_at": "2025-05-15T12:29:46.558731",
                                        "updated_at": "2025-05-22T09:27:45.213255"
                                    },
                                    {
                                        "id": 6271,
                                        "company_id": 47,
                                        "report_date": "2022-03-31",
                                        "parameter": "Profit before tax",
                                        "value": 9361.77,
                                        "created_at": "2025-05-15T12:29:46.558731",
                                        "updated_at": "2025-05-22T09:27:45.213255"
                                    },
                                    {
                                        "id": 6261,
                                        "company_id": 47,
                                        "report_date": "2022-03-31",
                                        "parameter": "Raw Material Cost",
                                        "value": 52664.85,
                                        "created_at": "2025-05-15T12:29:46.558731",
                                        "updated_at": "2025-05-22T09:27:45.213255"
                                    },
                                    {
                                        "id": 6260,
                                        "company_id": 47,
                                        "report_date": "2022-03-31",
                                        "parameter": "Sales",
                                        "value": 90170.57,
                                        "created_at": "2025-05-15T12:29:46.558731",
                                        "updated_at": "2025-05-22T09:27:45.213255"
                                    },
                                    {
                                        "id": 6266,
                                        "company_id": 47,
                                        "report_date": "2022-03-31",
                                        "parameter": "Selling and admin",
                                        "value": 5977.67,
                                        "created_at": "2025-05-15T12:29:46.558731",
                                        "updated_at": "2025-05-22T09:27:45.213255"
                                    },
                                    {
                                        "id": 6262,
                                        "company_id": 47,
                                        "report_date": "2022-03-31",
                                        "parameter": "Change in Inventory",
                                        "value": 861.66,
                                        "created_at": "2025-05-15T12:29:46.558731",
                                        "updated_at": "2025-05-22T09:27:45.213255"
                                    },
                                    {
                                        "id": 19929,
                                        "company_id": 141,
                                        "report_date": "2023-03-31",
                                        "parameter": "Sales Growth %",
                                        "value": 34.49,
                                        "created_at": "2025-05-15T12:29:46.558731",
                                        "updated_at": "2025-05-22T09:27:45.213255"
                                    },
                                    {
                                        "id": 6277,
                                        "company_id": 47,
                                        "report_date": "2023-03-31",
                                        "parameter": "Change in Inventory",
                                        "value": 2032.31,
                                        "created_at": "2025-05-15T12:29:46.558731",
                                        "updated_at": "2025-05-22T09:27:45.213255"
                                    },
                                    {
                                        "id": 6284,
                                        "company_id": 47,
                                        "report_date": "2023-03-31",
                                        "parameter": "Depreciation",
                                        "value": 4356.81,
                                        "created_at": "2025-05-15T12:29:46.558731",
                                        "updated_at": "2025-05-22T09:27:45.213255"
                                    },
                                    {
                                        "id": 6289,
                                        "company_id": 47,
                                        "report_date": "2023-03-31",
                                        "parameter": "Dividend Amount",
                                        "value": 1809.66,
                                        "created_at": "2025-05-15T12:29:46.558731",
                                        "updated_at": "2025-05-22T09:27:45.213255"
                                    },
                                    {
                                        "id": 6280,
                                        "company_id": 47,
                                        "report_date": "2023-03-31",
                                        "parameter": "Employee Cost",
                                        "value": 9677.95,
                                        "created_at": "2025-05-15T12:29:46.558731",
                                        "updated_at": "2025-05-22T09:27:45.213255"
                                    },
                                    {
                                        "id": 6285,
                                        "company_id": 47,
                                        "report_date": "2023-03-31",
                                        "parameter": "Interest",
                                        "value": 5829.7,
                                        "created_at": "2025-05-15T12:29:46.558731",
                                        "updated_at": "2025-05-22T09:27:45.213255"
                                    },
                                    {
                                        "id": 6288,
                                        "company_id": 47,
                                        "report_date": "2023-03-31",
                                        "parameter": "Net profit",
                                        "value": 10281.5,
                                        "created_at": "2025-05-15T12:29:46.558731",
                                        "updated_at": "2025-05-22T09:27:45.213255"
                                    },
                                    {
                                        "id": 6282,
                                        "company_id": 47,
                                        "report_date": "2023-03-31",
                                        "parameter": "Other Expenses",
                                        "value": 4966.98,
                                        "created_at": "2025-05-15T12:29:46.558731",
                                        "updated_at": "2025-05-22T09:27:45.213255"
                                    },
                                    {
                                        "id": 6283,
                                        "company_id": 47,
                                        "report_date": "2023-03-31",
                                        "parameter": "Other Income",
                                        "value": 3961.45,
                                        "created_at": "2025-05-15T12:29:46.558731",
                                        "updated_at": "2025-05-22T09:27:45.213255"
                                    },
                                    {
                                        "id": 6279,
                                        "company_id": 47,
                                        "report_date": "2023-03-31",
                                        "parameter": "Other Mfr. Exp",
                                        "value": 3838.42,
                                        "created_at": "2025-05-15T12:29:46.558731",
                                        "updated_at": "2025-05-22T09:27:45.213255"
                                    },
                                    {
                                        "id": 6278,
                                        "company_id": 47,
                                        "report_date": "2023-03-31",
                                        "parameter": "Power and Fuel",
                                        "value": 830.48,
                                        "created_at": "2025-05-15T12:29:46.558731",
                                        "updated_at": "2025-05-22T09:27:45.213255"
                                    },
                                    {
                                        "id": 6286,
                                        "company_id": 47,
                                        "report_date": "2023-03-31",
                                        "parameter": "Profit before tax",
                                        "value": 14060.23,
                                        "created_at": "2025-05-15T12:29:46.558731",
                                        "updated_at": "2025-05-22T09:27:45.213255"
                                    },
                                    {
                                        "id": 6276,
                                        "company_id": 47,
                                        "report_date": "2023-03-31",
                                        "parameter": "Raw Material Cost",
                                        "value": 76019.87,
                                        "created_at": "2025-05-15T12:29:46.558731",
                                        "updated_at": "2025-05-22T09:27:45.213255"
                                    },
                                    {
                                        "id": 6275,
                                        "company_id": 47,
                                        "report_date": "2023-03-31",
                                        "parameter": "Sales",
                                        "value": 121268.55,
                                        "created_at": "2025-05-15T12:29:46.558731",
                                        "updated_at": "2025-05-22T09:27:45.213255"
                                    },
                                    {
                                        "id": 6281,
                                        "company_id": 47,
                                        "report_date": "2023-03-31",
                                        "parameter": "Selling and admin",
                                        "value": 7681.87,
                                        "created_at": "2025-05-15T12:29:46.558731",
                                        "updated_at": "2025-05-22T09:27:45.213255"
                                    },
                                    {
                                        "id": 6287,
                                        "company_id": 47,
                                        "report_date": "2023-03-31",
                                        "parameter": "Tax",
                                        "value": 2685.75,
                                        "created_at": "2025-05-15T12:29:46.558731",
                                        "updated_at": "2025-05-22T09:27:45.213255"
                                    },
                                    {
                                        "id": 19965,
                                        "company_id": 141,
                                        "report_date": "2023-03-31",
                                        "parameter": "Employee Cost %",
                                        "value": 8,
                                        "created_at": "2025-05-15T12:29:46.558731",
                                        "updated_at": "2025-05-22T09:27:45.213255"
                                    },
                                    {
                                        "id": 19989,
                                        "company_id": 141,
                                        "report_date": "2023-03-31",
                                        "parameter": "Exceptional items",
                                        "value": 1250,
                                        "created_at": "2025-05-15T12:29:46.558731",
                                        "updated_at": "2025-05-22T09:27:45.213255"
                                    },
                                    {
                                        "id": 20073,
                                        "company_id": 141,
                                        "report_date": "2023-03-31",
                                        "parameter": "Exceptional items AT",
                                        "value": 1006,
                                        "created_at": "2025-05-15T12:29:46.558731",
                                        "updated_at": "2025-05-22T09:27:45.213255"
                                    },
                                    {
                                        "id": 19953,
                                        "company_id": 141,
                                        "report_date": "2023-03-31",
                                        "parameter": "Manufacturing Cost %",
                                        "value": 4,
                                        "created_at": "2025-05-15T12:29:46.558731",
                                        "updated_at": "2025-05-22T09:27:45.213255"
                                    },
                                    {
                                        "id": 19941,
                                        "company_id": 141,
                                        "report_date": "2023-03-31",
                                        "parameter": "Material Cost %",
                                        "value": 61,
                                        "created_at": "2025-05-15T12:29:46.558731",
                                        "updated_at": "2025-05-22T09:27:45.213255"
                                    },
                                    {
                                        "id": 20049,
                                        "company_id": 141,
                                        "report_date": "2023-03-31",
                                        "parameter": "Minority share",
                                        "value": -1093,
                                        "created_at": "2025-05-15T12:29:46.558731",
                                        "updated_at": "2025-05-22T09:27:45.213255"
                                    },
                                    {
                                        "id": 19977,
                                        "company_id": 141,
                                        "report_date": "2023-03-31",
                                        "parameter": "Other Cost %",
                                        "value": 10,
                                        "created_at": "2025-05-15T12:29:46.558731",
                                        "updated_at": "2025-05-22T09:27:45.213255"
                                    },
                                    {
                                        "id": 20001,
                                        "company_id": 141,
                                        "report_date": "2023-03-31",
                                        "parameter": "Other income normal",
                                        "value": 2712,
                                        "created_at": "2025-05-15T12:29:46.558731",
                                        "updated_at": "2025-05-22T09:27:45.213255"
                                    },
                                    {
                                        "id": 20013,
                                        "company_id": 141,
                                        "report_date": "2023-03-31",
                                        "parameter": "Profit after tax",
                                        "value": 11374,
                                        "created_at": "2025-05-15T12:29:46.558731",
                                        "updated_at": "2025-05-22T09:27:45.213255"
                                    },
                                    {
                                        "id": 20061,
                                        "company_id": 141,
                                        "report_date": "2023-03-31",
                                        "parameter": "Profit for EPS",
                                        "value": 10282,
                                        "created_at": "2025-05-15T12:29:46.558731",
                                        "updated_at": "2025-05-22T09:27:45.213255"
                                    },
                                    {
                                        "id": 20085,
                                        "company_id": 141,
                                        "report_date": "2023-03-31",
                                        "parameter": "Profit for PE",
                                        "value": 9372,
                                        "created_at": "2025-05-15T12:29:46.558731",
                                        "updated_at": "2025-05-22T09:27:45.213255"
                                    },
                                    {
                                        "id": 20025,
                                        "company_id": 141,
                                        "report_date": "2023-03-31",
                                        "parameter": "Profit from Associates",
                                        "value": 0,
                                        "created_at": "2025-05-15T12:29:46.558731",
                                        "updated_at": "2025-05-22T09:27:45.213255"
                                    },
                                    {
                                        "id": 20037,
                                        "company_id": 141,
                                        "report_date": "2023-03-31",
                                        "parameter": "Reported Net Profit",
                                        "value": 11374,
                                        "created_at": "2025-05-15T12:29:46.558731",
                                        "updated_at": "2025-05-22T09:27:45.213255"
                                    }
                                ]
                            }
                        ],
                        "colab_data": {
                            "companies": [
                                "INFY",
                                "M&M"
                            ],
                            "context": "\nCOMPANY: Infosys Limited (INFY)\nREPORTING_DATE: N/A\nSECTION: Unknown\nCONTENT: Open, MSG properties, Dow Jones, Financial Times). The Infosys Knowledge Institute (IKI) is positioned as the business research arm providing thought leadership and insights on technology's business impact through publications and client collaborations. The overall tone is forward-looking and emphasizes the company's capabilities, partnerships, and strategic direction to drive value for clients and stay ahead in the market. The text provides detailed information relevant to investors, primarily focusing on share capital structure and employee stock option plans. It lists major shareholders holding over 5% of shares as of March 31, 2022 and 2021, including Deutsche Bank Trust Company Americas (Depository of ADRs) and Life Insurance Corporation of India, along with their respective share counts and percentage holdings. A reconciliation of the number of shares outstanding and the amount of share capital is provided, showing changes from March 31, 2021 to March 31, 2022, including shares issued on exercise of employee stock options and shares bought back. The document details the 2015 Stock Incentive Compensation Plan and the 2019 Infosys Expanded Stock Ownership Program, outlining the maximum number of shares authorized, accounting policies for recognizing compensation expense, vesting periods (typically 4 years for RSUs and stock options, 1-3 years for performance-based RSUs), and performance parameters The management narrative highlights key strategic initiatives focusing on innovation, branding, and knowledge leadership. The Infosys Center for Emerging Technology Solutions (iCETS) is presented as the incubation partner for emerging technology solutions, leveraging 'New Emerging and eXploratory Technologies’ (NEXT) across dimensions like IncubateNext (rapid innovation, Living Labs), InspireNext (discovering new business possibilities, LPaaS, CoEs), ServiceNext (leveraging IP for differentiated offerings), and ConnectNext (external ecosystem collaboration, Infosys Innovation Network). The company emphasizes its brand value as a key intangible asset, positioned as a next-generation digital-first, cloud-first, and AI-first partner, built on four decades of experience navigating global enterprises. Marketing efforts leverage global digital campaigns and strategic partnerships (e.g., Australian Open, MSG properties, Dow Jones, Financial Times). The Infosys Knowledge Institute (IKI) is\n\n---\n\nCOMPANY: Mahindra & Mahindra Limited (M&M)\nREPORTING_DATE: N/A\nSECTION: Unknown\nCONTENT: This section presents standalone financial statements for Mahindra & Mahindra Ltd. as at and for the period ended 31st March, 2024, compared to the previous year (2023). Key financial figures relevant to investors include the Balance Sheet and the start of the Statement of Profit and Loss. This section, part of the Management Discussion and Analysis, serves as management's narrative on the company's performance for FY 2023-24. It provides context and explanation for changes in key financial ratios and expenditure components. Management highlights successful cost management initiatives leading to a reduction in total expenditure as a percentage of income and decreases in material costs and finance costs, primarily due to benign commodity prices, management initiatives, and repayment of borrowings. The narrative also touches upon strategic directions within group companies, such as Tech Mahindra's multi-year transformation for leadership, Club Mahindra's expansion and innovation focus, and Mahindra Lifespaces' focused growth strategy emphasizing sustainable urban developments. The tone is explanatory, providing reasons behind financial movements. Key messages include the improvement in financial health indicators like the Interest Coverage Ratio and Debt Equity Ratio due The text provides detailed financial highlights and business updates for several Kotak Mahindra subsidiaries, key information for investors evaluating performance. For **Kotak Mahindra Pension Fund Limited (KMPFL)**, Total Income was ₹3.39 crore (FY22) vs ₹3.81 crore (FY21), PBT was (₹1.54) crore (FY22 loss) vs ₹0.45 crore (FY21 profit), PAT was (₹1.54) crore (FY22 loss) vs ₹0.21 crore (FY21 profit). AUM grew by 42% to ₹2,230 crore (FY22) from ₹1,572 crore (FY21), outperforming the industry growth of 27%. KMPFL funds were top-performing in Government debt and among top two in Equity (NPS Tier 1) for FY22 and other periods. Regulatory changes included PFRDA approving shareholding transfer and a new AUM-based investment management fee structure effective June 1, 2021. The FY22 loss was attributed to increased costs offsetting higher fee income from the new structure.\n\n---",
                            "financial_keywords": [],
                            "ner_entities": [
                                "infy",
                                "m&m"
                            ],
                            "search_metadata": {
                                "documents_after_filtering": 13,
                                "documents_retrieved": 13,
                                "original_query": "INFY vs M&M",
                                "search_strategy": "targeted_company_searches"
                            },
                            "structured_data": {
                                "companies_data": [
                                    {
                                        "company_name": "Infosys Limited",
                                        "content": "Open, MSG properties, Dow Jones, Financial Times). The Infosys Knowledge Institute (IKI) is positioned as the business research arm providing thought leadership and insights on technology's business impact through publications and client collaborations. The overall tone is forward-looking and emphasizes the company's capabilities, partnerships, and strategic direction to drive value for clients and stay ahead in the market. The text provides detailed information relevant to investors, primarily focusing on share capital structure and employee stock option plans. It lists major shareholders holding over 5% of shares as of March 31, 2022 and 2021, including Deutsche Bank Trust Company Americas (Depository of ADRs) and Life Insurance Corporation of India, along with their respective share counts and percentage holdings. A reconciliation of the number of shares outstanding and the amount of share capital is provided, showing changes from March 31, 2021 to March 31, 2022, including shares issued on exercise of employee stock options and shares bought back. The document details the 2015 Stock Incentive Compensation Plan and the 2019 Infosys Expanded Stock Ownership Program, outlining the maximum number of shares authorized, accounting policies for recognizing compensation expense, vesting periods (typically 4 years for RSUs and stock options, 1-3 years for performance-based RSUs), and performance parameters The management narrative highlights key strategic initiatives focusing on innovation, branding, and knowledge leadership. The Infosys Center for Emerging Technology Solutions (iCETS) is presented as the incubation partner for emerging technology solutions, leveraging 'New Emerging and eXploratory Technologies’ (NEXT) across dimensions like IncubateNext (rapid innovation, Living Labs), InspireNext (discovering new business possibilities, LPaaS, CoEs), ServiceNext (leveraging IP for differentiated offerings), and ConnectNext (external ecosystem collaboration, Infosys Innovation Network). The company emphasizes its brand value as a key intangible asset, positioned as a next-generation digital-first, cloud-first, and AI-first partner, built on four decades of experience navigating global enterprises. Marketing efforts leverage global digital campaigns and strategic partnerships (e.g., Australian Open, MSG properties, Dow Jones, Financial Times). The Infosys Knowledge Institute (IKI) is",
                                        "reporting_date": "N/A",
                                        "section": "Unknown",
                                        "ticker": "INFY"
                                    },
                                    {
                                        "company_name": "Mahindra & Mahindra Limited",
                                        "content": "This section presents standalone financial statements for Mahindra & Mahindra Ltd. as at and for the period ended 31st March, 2024, compared to the previous year (2023). Key financial figures relevant to investors include the Balance Sheet and the start of the Statement of Profit and Loss. This section, part of the Management Discussion and Analysis, serves as management's narrative on the company's performance for FY 2023-24. It provides context and explanation for changes in key financial ratios and expenditure components. Management highlights successful cost management initiatives leading to a reduction in total expenditure as a percentage of income and decreases in material costs and finance costs, primarily due to benign commodity prices, management initiatives, and repayment of borrowings. The narrative also touches upon strategic directions within group companies, such as Tech Mahindra's multi-year transformation for leadership, Club Mahindra's expansion and innovation focus, and Mahindra Lifespaces' focused growth strategy emphasizing sustainable urban developments. The tone is explanatory, providing reasons behind financial movements. Key messages include the improvement in financial health indicators like the Interest Coverage Ratio and Debt Equity Ratio due The text provides detailed financial highlights and business updates for several Kotak Mahindra subsidiaries, key information for investors evaluating performance. For **Kotak Mahindra Pension Fund Limited (KMPFL)**, Total Income was ₹3.39 crore (FY22) vs ₹3.81 crore (FY21), PBT was (₹1.54) crore (FY22 loss) vs ₹0.45 crore (FY21 profit), PAT was (₹1.54) crore (FY22 loss) vs ₹0.21 crore (FY21 profit). AUM grew by 42% to ₹2,230 crore (FY22) from ₹1,572 crore (FY21), outperforming the industry growth of 27%. KMPFL funds were top-performing in Government debt and among top two in Equity (NPS Tier 1) for FY22 and other periods. Regulatory changes included PFRDA approving shareholding transfer and a new AUM-based investment management fee structure effective June 1, 2021. The FY22 loss was attributed to increased costs offsetting higher fee income from the new structure.",
                                        "reporting_date": "N/A",
                                        "section": "Unknown",
                                        "ticker": "M&M"
                                    }
                                ],
                                "summary": {
                                    "companies_list": [
                                        "INFY",
                                        "M&M"
                                    ],
                                    "total_companies": 2
                                }
                            },
                            "total_documents": 13
                        },
                        "context_info": {
                            "ner_entities": [
                                "infy",
                                "m&m"
                            ],
                            "num_chunks": 0,
                            "context_length": 4768
                        }
                    },
                    timestamp: "2023-10-01T12:00:00Z"
                },
                {
                    query: "What is the difference between Infosys and Mahindra?",
                    response: {
                        "llm_response": "**Letter to Shareholders Analysis:**\nThe management narrative for Infosys (INFY) is described as having a **forward-looking** tone, emphasizing capabilities, partnerships, and strategic direction. The style appears **assertive** and the emotion **upbeat**, focusing on driving value and market leadership. Transparency is 🟢Transparent regarding strategic focus areas. Key points include emphasis on innovation, branding, and knowledge leadership through initiatives like iCETS and IKI.\n\nThe Management Discussion and Analysis for Mahindra & Mahindra (M&M) has an **explanatory** tone, providing reasons behind financial movements and performance. The style is **neutral** and emotion appears **neutral**, focusing on detailing financial changes and strategic directions within group companies. Transparency is 🟢Transparent regarding financial performance explanations and subsidiary updates. Key points include highlighting successful cost management initiatives, improvements in financial health indicators (Interest Coverage, Debt Equity Ratio), and updates on subsidiary performance (e.g., KMPFL's AUM growth despite a loss).\n\nComparing the two, INFY's narrative is more focused on strategic initiatives and future positioning, while M&M's is more centered on explaining past financial performance and subsidiary updates.\n\n**Investor Relations Summary:**\nRelevant quantitative data for investors from the context:\n\n**Infosys Limited (INFY):**\n- Major shareholders (over 5% as of March 31, 2022): Deutsche Bank Trust Company Americas (Depository of ADRs) and Life Insurance Corporation of India. Specific share counts and percentage holdings are listed for these entities for both FY22 and FY21.\n- Reconciliation of shares outstanding and share capital provided, showing changes from March 31, 2021 to March 31, 2022, including shares issued on exercise of employee stock options and shares bought back.\n- Details of 2015 Stock Incentive Compensation Plan and 2019 Infosys Expanded Stock Ownership Program: Maximum authorized shares, accounting policies, typical vesting periods (4 years for RSUs/options, 1-3 years for performance RSUs), and performance parameters.\n\n**Mahindra & Mahindra Limited (M&M):**\n- Reference to standalone financial statements (Balance Sheet and Statement of Profit and Loss) for FY24 vs FY23.\n- Management highlights improvements in financial health indicators like Interest Coverage Ratio and Debt Equity Ratio (specific values not provided).\n- Cost management initiatives led to reductions in total expenditure as a percentage of income, material costs, and finance costs.\n- Financial highlights for Kotak Mahindra Pension Fund Limited (KMPFL) subsidiary (FY22 vs FY21):\n    - Total Income: ₹3.39 crore (FY22) vs ₹3.81 crore (FY21).\n    - PBT: (₹1.54) crore loss (FY22) vs ₹0.45 crore profit (FY21).\n    - PAT: (₹1.54) crore loss (FY22) vs ₹0.21 crore profit (FY21).\n    - AUM: Grew 42% to ₹2,230 crore (FY22) from ₹1,572 crore (FY21).\n    - Fund Performance (FY22): Top-performing in Government debt, among top two in Equity (NPS Tier 1).",
                        "company_overviews": [
                            {
                                "overview": {
                                    "overview_text": "For company Infosys Limited Company Overview Hide\n\nInfosys Limited (Infosys) is a global leader in next-generation digital services and consulting. Founded in 1981 in Pune, India, by seven engineers, the company initially focused on providing IT services to companies in the United States. Over the decades, Infosys has grown from a small startup to a multinational corporation with a significant global presence, serving clients across various industries and geographies. It is headquartered in Bangalore, India.\n\n**Key Business Operations and Segments:**\n\nInfosys's core business revolves around providing a wide range of technology and consulting services to help clients navigate their digital transformation journeys. These services are broadly categorized as:\n\n*   **Digital Transformation Services:** This segment is at the forefront of Infosys's offerings, encompassing services designed to help clients reinvent their businesses for the digital age. This includes cloud services (migration, management, and optimization), data analytics and artificial intelligence (AI), internet of things (IoT), cybersecurity, and digital process automation. Infosys assists organizations in modernizing their legacy systems, adopting new technologies, and building future-ready digital solutions.\n\n*   **Consulting Services:** Infosys Consulting provides strategic advisory services to help clients define their business strategies, improve operational efficiency, and navigate complex business challenges. These services include management consulting, business process consulting, and technology consulting. Consultants work closely with clients to understand their unique needs and develop tailored solutions that drive business value.\n\n*   **Engineering Services:** This segment focuses on providing engineering solutions and services across various industries, including aerospace, automotive, healthcare, and manufacturing. Infosys helps clients design, develop, and test new products and technologies, optimize their engineering processes, and improve product quality. Engineering services encompass areas such as product engineering, embedded systems, and manufacturing automation.\n\n*   **Application Development and Maintenance (ADM):** This is a traditional but still significant part of Infosys's business. ADM services involve developing new applications, maintaining existing applications, and modernizing application portfolios. Infosys utilizes various development methodologies, including Agile and DevOps, to deliver high-quality applications that meet clients' evolving business needs. The focus is also on modernizing application landscapes using cloud-native technologies.\n\n*   **Independent Validation Services:** This segment provides testing and validation services to ensure the quality, reliability, and security of software applications. Infosys offers a comprehensive suite of testing services, including functional testing, performance testing, security testing, and automation testing. Independent validation helps clients reduce risks associated with software defects and improve the overall quality of their IT systems.\n\n*   **Infrastructure Management Services:** Infosys provides infrastructure management services to help clients manage their IT infrastructure, including servers, networks, and storage systems. These services include infrastructure monitoring, maintenance, and support, as well as cloud infrastructure management. Infosys helps clients optimize their infrastructure performance, improve reliability, and reduce costs. They leverage automation and AI-powered tools for proactive monitoring and incident resolution.\n\n*   **Business Process Management (BPM):** Infosys BPM (formerly Infosys BPO) provides outsourcing services for various business processes, including finance and accounting, human resources, customer service, and supply chain management. BPM helps clients improve operational efficiency, reduce costs, and focus on their core competencies. They combine process expertise, technology, and analytics to deliver customized solutions that meet clients' specific needs.\n\n**Revenue Segments (Based on Industry Verticals):**\n\nInfosys derives revenue from a diversified portfolio of industries. While specific percentages fluctuate year to year, key industry verticals include:\n\n*   **Financial Services:** This is a significant revenue generator for Infosys. They provide services to banks, insurance companies, and other financial institutions, helping them with digital transformation, regulatory compliance, and operational efficiency. Areas of focus include digital banking, fraud detection, risk management, and wealth management.\n\n*   **Retail, Consumer Packaged Goods (CPG), and Logistics:** Infosys works with retailers, consumer goods companies, and logistics providers to help them optimize their supply chains, improve customer experience, and drive revenue growth. Services include e-commerce platform development, supply chain optimization, and data analytics.\n\n*   **Manufacturing:** Infosys provides solutions to manufacturers to improve their operational efficiency, optimize their supply chains, and develop new products. Services include product engineering, manufacturing automation, and predictive maintenance. Focus areas include Industry 4.0 initiatives.\n\n*   **Energy, Utilities, Resources, and Services:** This segment includes companies in the energy, utilities, resources, and services industries. Infosys helps these companies with digital transformation, operational efficiency, and sustainability initiatives. Specific areas of focus include smart grids, renewable energy, and resource management.\n\n*   **Communications, Media, and Entertainment:** Infosys provides services to telecommunications companies, media companies, and entertainment companies, helping them with digital transformation, content management, and customer engagement. Areas of focus include 5G, cloud services, and streaming platforms.\n\n*   **Life Sciences and Healthcare:** Infosys works with pharmaceutical companies, medical device manufacturers, and healthcare providers to help them improve patient care, accelerate drug development, and comply with regulations. Services include clinical trial management, drug discovery, and electronic health record (EHR) implementation.\n\n*   **Hi-Tech:** This vertical includes companies in the technology sector itself. Infosys helps these companies with product development, testing, and infrastructure management. They also support areas like semiconductor design and cloud services.\n\n*   **Others:** This category includes revenue from industries not explicitly listed above, contributing to the company's overall revenue diversification.\n\n**Relevant Historical Details:**\n\n*   **Founding:** Infosys was founded in 1981 by N. R. Narayana Murthy, Nandan Nilekani, S. Gopalakrishnan, S. D. Shibulal, K. Dinesh, Ashok Arora, and N. S. Raghavan with an initial capital of $250.\n\n*   **Initial Public Offering (IPO):** Infosys went public on the Bombay Stock Exchange (BSE) in 1993 and later on the NASDAQ in 1999, becoming the first Indian company to be listed on the NASDAQ.\n\n*   **Global Expansion:** Throughout the 1990s and 2000s, Infosys expanded its global presence by establishing offices and development centers in various countries, including the United States, Europe, and Asia. This expansion enabled the company to serve clients worldwide and tap into new markets.\n\n*   **Leadership Transitions:** Infosys has seen several leadership transitions over the years, with different CEOs guiding the company through various phases of growth and transformation. N. R. Narayana Murthy, Nandan Nilekani, S. Gopalakrishnan, and S. D. Shibulal have all served as CEOs, contributing to the company's success. In 2014, Vishal Sikka became the first non-founder CEO. Currently, Salil Parekh serves as the CEO of Infosys.\n\n*   **Strategic Acquisitions:** Infosys has made several strategic acquisitions to expand its capabilities and strengthen its market position. Notable acquisitions include Lodestone Holding AG, a global management consulting firm, and Panaya, a cloud-based automation technology provider. These acquisitions have enabled Infosys to offer a broader range of services and solutions to its clients.\n\n*   **Focus on Innovation:** Infosys has consistently invested in research and development to stay ahead of the curve in the rapidly evolving technology landscape. The company has established innovation labs and centers of excellence to explore emerging technologies and develop innovative solutions for its clients.\n\n*   **Commitment to Corporate Social Responsibility (CSR):** Infosys is committed to corporate social responsibility and has undertaken various initiatives to address social and environmental challenges. The Infosys Foundation, the company's philanthropic arm, supports programs in education, healthcare, and rural development.\n\n*   **Continued Evolution:** Infosys continues to evolve its offerings to meet the changing needs of its clients. The company is focused on providing end-to-end digital transformation solutions, leveraging technologies such as cloud computing, artificial intelligence, and data analytics. Infosys also emphasizes sustainability and responsible business practices.\n\nIn summary, Infosys is a global leader in technology services and consulting, providing a comprehensive suite of solutions to help clients navigate their digital transformation journeys. With a strong focus on innovation, strategic acquisitions, and a commitment to corporate social responsibility, Infosys is well-positioned to continue its growth and success in the years to come. The company's diversified revenue streams across industries and geographic locations contribute to its stability and resilience in the face of market fluctuations."
                                },
                                "stats": {
                                    "profile_metrics": {
                                        "columns": [
                                            "metric",
                                            "value",
                                            "unit",
                                            "as_of"
                                        ],
                                        "values": [
                                            [
                                                "Market Cap",
                                                620000,
                                                "Crore INR",
                                                "2023-10-27"
                                            ],
                                            [
                                                "EV",
                                                590500,
                                                "Crore INR",
                                                "2023-10-27"
                                            ],
                                            [
                                                "Shares Out",
                                                4148,
                                                "Million",
                                                "2023-10-27"
                                            ],
                                            [
                                                "Revenue",
                                                153670,
                                                "Crore INR",
                                                "2023-09-30"
                                            ],
                                            [
                                                "Employees",
                                                328000,
                                                "People",
                                                "2023-09-30"
                                            ]
                                        ]
                                    },
                                    "margins_metrics": {
                                        "columns": [
                                            "metric",
                                            "value",
                                            "unit",
                                            "as_of"
                                        ],
                                        "values": [
                                            [
                                                "Gross",
                                                35,
                                                "%",
                                                "2023-09-30"
                                            ],
                                            [
                                                "EBITDA",
                                                25,
                                                "%",
                                                "2023-09-30"
                                            ],
                                            [
                                                "Operating",
                                                21,
                                                "%",
                                                "2023-09-30"
                                            ],
                                            [
                                                "Pre-Tax",
                                                20,
                                                "%",
                                                "2023-09-30"
                                            ],
                                            [
                                                "Net",
                                                16.5,
                                                "%",
                                                "2023-09-30"
                                            ],
                                            [
                                                "FCF",
                                                18,
                                                "%",
                                                "2023-09-30"
                                            ]
                                        ]
                                    },
                                    "returns_5yr_avg_metrics": {
                                        "columns": [
                                            "metric",
                                            "value",
                                            "unit",
                                            "as_of"
                                        ],
                                        "values": [
                                            [
                                                "ROA",
                                                16,
                                                "%",
                                                "2023-03-31"
                                            ],
                                            [
                                                "ROTA",
                                                17,
                                                "%",
                                                "2023-03-31"
                                            ],
                                            [
                                                "ROE",
                                                24,
                                                "%",
                                                "2023-03-31"
                                            ],
                                            [
                                                "ROCE",
                                                28,
                                                "%",
                                                "2023-03-31"
                                            ],
                                            [
                                                "ROIC",
                                                25,
                                                "%",
                                                "2023-03-31"
                                            ]
                                        ]
                                    },
                                    "valuation_ttm_metrics": {
                                        "columns": [
                                            "metric",
                                            "value",
                                            "unit",
                                            "as_of"
                                        ],
                                        "values": [
                                            [
                                                "P/E",
                                                25,
                                                "Times",
                                                "2023-10-27"
                                            ],
                                            [
                                                "P/B",
                                                6.8,
                                                "Times",
                                                "2023-10-27"
                                            ],
                                            [
                                                "EV/Sales",
                                                3.84,
                                                "Times",
                                                "2023-10-27"
                                            ],
                                            [
                                                "EV/EBITDA",
                                                15.37,
                                                "Times",
                                                "2023-10-27"
                                            ],
                                            [
                                                "P/FCF",
                                                22.41,
                                                "Times",
                                                "2023-10-27"
                                            ],
                                            [
                                                "EV/Gross Profit",
                                                10.98,
                                                "Times",
                                                "2023-10-27"
                                            ]
                                        ]
                                    },
                                    "valuation_ntm_metrics": {
                                        "columns": [
                                            "metric",
                                            "value",
                                            "unit",
                                            "as_of"
                                        ],
                                        "values": [
                                            [
                                                "Price Target",
                                                1550,
                                                "INR",
                                                "2023-10-27"
                                            ],
                                            [
                                                "P/E",
                                                22,
                                                "Times",
                                                "2023-10-27"
                                            ],
                                            [
                                                "PEG",
                                                2,
                                                "Times",
                                                "2023-10-27"
                                            ],
                                            [
                                                "EV/Sales",
                                                3.5,
                                                "Times",
                                                "2023-10-27"
                                            ],
                                            [
                                                "EV/EBITDA",
                                                14,
                                                "Times",
                                                "2023-10-27"
                                            ],
                                            [
                                                "P/FCF",
                                                20,
                                                "Times",
                                                "2023-10-27"
                                            ]
                                        ]
                                    },
                                    "financial_health_metrics": {
                                        "columns": [
                                            "metric",
                                            "value",
                                            "unit",
                                            "as_of"
                                        ],
                                        "values": [
                                            [
                                                "Cash",
                                                35000,
                                                "Crore INR",
                                                "2023-09-30"
                                            ],
                                            [
                                                "Net Debt",
                                                -29500,
                                                "Crore INR",
                                                "2023-09-30"
                                            ],
                                            [
                                                "Debt/Equity",
                                                0.02,
                                                "Times",
                                                "2023-09-30"
                                            ],
                                            [
                                                "EBIT/Interest",
                                                60,
                                                "Times",
                                                "2023-09-30"
                                            ]
                                        ]
                                    },
                                    "growth_cagr_metrics": {
                                        "columns": [
                                            "metric",
                                            "value",
                                            "unit",
                                            "as_of"
                                        ],
                                        "values": [
                                            [
                                                "Rev 3Yr",
                                                15,
                                                "%",
                                                "2023-03-31"
                                            ],
                                            [
                                                "Rev 5Yr",
                                                13,
                                                "%",
                                                "2023-03-31"
                                            ],
                                            [
                                                "Rev 10Yr",
                                                11,
                                                "%",
                                                "2023-03-31"
                                            ],
                                            [
                                                "Dil EPS 3Yr",
                                                12,
                                                "%",
                                                "2023-03-31"
                                            ],
                                            [
                                                "Dil EPS 5Yr",
                                                10,
                                                "%",
                                                "2023-03-31"
                                            ],
                                            [
                                                "Dil EPS 10Yr",
                                                9,
                                                "%",
                                                "2023-03-31"
                                            ],
                                            [
                                                "Rev Fwd 2Yr",
                                                8,
                                                "%",
                                                "2023-10-27"
                                            ],
                                            [
                                                "EBITDA Fwd 2Yr",
                                                9,
                                                "%",
                                                "2023-10-27"
                                            ],
                                            [
                                                "EPS Fwd 2Yr",
                                                10,
                                                "%",
                                                "2023-10-27"
                                            ],
                                            [
                                                "EPS LT Growth Est",
                                                11,
                                                "%",
                                                "2023-10-27"
                                            ]
                                        ]
                                    }
                                }
                            },
                            {
                                "overview": {
                                    "overview_text": "For company Mahindra & Mahindra Company Overview Hide\n\nMahindra & Mahindra (M&M) is a multinational conglomerate headquartered in Mumbai, India, and is one of the largest companies in India. Founded in 1945 as Mahindra & Mohammed by brothers Kailash Chandra Mahindra and Jagdish Chandra Mahindra along with Malik Ghulam Mohammed, the company initially started as a steel trading company. It was renamed Mahindra & Mahindra in 1948 after Mohammed emigrated to Pakistan following partition. From its early days of assembling Willys Jeeps for the Indian market, M&M has grown into a diverse and expansive business house with a significant presence in various sectors.\n\n**Key Business Operations and Segments:**\n\nM&M's operations are broadly categorized into several core sectors. These include:\n\n*   **Automotive:** This segment is the cornerstone of M&M's business. The automotive division designs, develops, manufactures, and markets a wide range of vehicles, including:\n\n    *   **Utility Vehicles (UVs):** Mahindra is renowned for its UVs, which are typically rugged, reliable, and well-suited for Indian road conditions. Key models include the Scorpio, Bolero, XUV series (XUV700, XUV300), Thar, and more. These vehicles often cater to both personal and commercial transportation needs.\n    *   **Commercial Vehicles (CVs):** M&M also produces a range of commercial vehicles, including light commercial vehicles (LCVs), trucks, and buses. These vehicles cater to the transportation of goods and people, serving diverse business needs.\n    *   **Electric Vehicles (EVs):** Recognizing the growing importance of electric mobility, Mahindra has invested heavily in EV technology. Its electric vehicle portfolio includes the e2oPlus, eVerito, and eSupro. Mahindra aims to expand its EV offerings in the coming years significantly, demonstrating a commitment to sustainable transportation. Future models include electric versions of popular SUVs.\n    *   **Two-Wheelers:** Mahindra entered the two-wheeler market but later divested from mass-market two-wheelers. It now focuses on premium motorcycles through its subsidiary Classic Legends, which owns brands like Jawa and Yezdi, and through Peugeot Motocycles acquired from PSA Group.\n    *   **Construction Equipment:** Mahindra also manufactures and sells construction equipment such as backhoe loaders and compactors through Mahindra Construction Equipment.\n\n*   **Farm Equipment (Tractors):** Mahindra is the world's largest tractor manufacturer by volume. The farm equipment sector is crucial to M&M's business, especially in India, where agriculture is a significant economic driver.\n\n    *   **Tractors:** Mahindra tractors are known for their durability, reliability, and affordability. The company offers a wide range of tractors suitable for various farming applications, from small landholdings to large-scale agricultural operations.\n    *   **Agricultural Implements:** Besides tractors, M&M also produces and markets a range of agricultural implements, such as harvesters, planters, and cultivators, to provide comprehensive solutions for farmers.\n    *   **Precision Farming:** Mahindra is actively involved in promoting precision farming techniques, leveraging technology to improve agricultural productivity and efficiency.\n\n*   **Financial Services:** Mahindra Finance provides financial products and services primarily focused on the rural and semi-urban sectors in India.\n\n    *   **Vehicle Finance:** The company offers financing options for Mahindra vehicles, making them accessible to a broader customer base.\n    *   **Tractor Finance:** Mahindra Finance is a leading provider of tractor finance, supporting farmers in purchasing tractors and related equipment.\n    *   **SME Finance:** The company also provides financial assistance to small and medium-sized enterprises (SMEs) in rural areas, contributing to economic development.\n    *   **Housing Finance:** Mahindra Housing Finance offers loans for home construction and purchase, catering to the housing needs of customers in rural and semi-urban areas.\n\n*   **IT Services:** Mahindra's IT services arm, Tech Mahindra, is a global provider of digital transformation, consulting, and business re-engineering services and solutions.\n\n    *   **Consulting:** Tech Mahindra offers consulting services to help businesses optimize their operations, adopt new technologies, and achieve their strategic goals.\n    *   **Digital Transformation:** The company assists clients in their digital transformation journeys, enabling them to leverage the power of digital technologies to enhance their customer experiences, improve their processes, and drive innovation.\n    *   **Business Process Services (BPS):** Tech Mahindra provides BPS solutions to help businesses streamline their operations, reduce costs, and improve efficiency.\n    *   **Engineering Services:** The company offers engineering services to support product development, manufacturing, and infrastructure projects.\n    *   **Communications, Media & Entertainment:** This vertical caters to the needs of telecom operators, media companies, and entertainment providers, offering solutions for network modernization, content management, and customer engagement.\n\n*   **Defense:** Mahindra Defence Systems offers a range of defense solutions, including armored vehicles, naval systems, and security solutions. The company aims to contribute to India's defense capabilities and security.\n\n    *   **Armored Vehicles:** Mahindra Defence produces armored vehicles for military and paramilitary forces, providing protection and mobility in challenging environments.\n    *   **Naval Systems:** The company offers naval systems and solutions, including patrol boats, surveillance systems, and underwater warfare capabilities.\n    *   **Security Solutions:** Mahindra Defence provides security solutions for critical infrastructure, border protection, and homeland security.\n\n*   **Real Estate:** Mahindra Lifespace Developers is the real estate development arm of the Mahindra Group. It develops residential projects, integrated cities, and industrial clusters.\n\n    *   **Residential Projects:** Mahindra Lifespace develops residential projects catering to diverse customer segments, focusing on sustainable and eco-friendly designs.\n    *   **Integrated Cities:** The company develops integrated cities that offer a mix of residential, commercial, and social infrastructure, creating self-contained and sustainable communities.\n    *   **Industrial Clusters:** Mahindra Lifespace develops industrial clusters to provide a conducive environment for businesses to operate and grow.\n\n*   **Hospitality:** Mahindra Holidays & Resorts India operates a network of resorts and offers vacation ownership plans.\n\n    *   **Resorts:** Mahindra Holidays operates a chain of resorts across India and abroad, providing vacation experiences for families and individuals.\n    *   **Vacation Ownership:** The company offers vacation ownership plans, allowing members to enjoy vacation benefits at Mahindra resorts and affiliated properties.\n\n*   **Energy:** Mahindra Susten provides renewable energy solutions, including solar power generation.\n\n    *   **Solar Power:** Mahindra Susten develops and operates solar power projects, contributing to India's renewable energy goals.\n    *   **Energy Management:** The company offers energy management solutions to help businesses reduce their energy consumption and improve their energy efficiency.\n\n**Revenue Segments:**\n\nWhile precise revenue figures fluctuate annually and are detailed in M&M's financial reports, the primary revenue drivers can be broadly categorized:\n\n*   **Automotive Sector:** This typically contributes the largest share of revenue, driven by sales of UVs, CVs, and increasingly EVs.\n*   **Farm Equipment Sector:** Tractor sales contribute significantly, especially during strong agricultural seasons in India.\n*   **IT Services (Tech Mahindra):** Tech Mahindra is a major revenue generator, providing a diversified income stream through its global IT services operations.\n*   **Financial Services:** Mahindra Finance contributes a substantial portion through vehicle, tractor, and SME financing.\n*   **Other Segments:** The remaining segments (Defense, Real Estate, Hospitality, Energy, etc.) contribute smaller but still significant portions to the overall revenue.\n\n**Relevant Historical Details:**\n\n*   **1945:** Mahindra & Mohammed is founded as a steel trading company.\n*   **1948:** Renamed Mahindra & Mahindra. Begins assembling Willys Jeeps in India.\n*   **1960s-1980s:** Expands into tractor manufacturing and other sectors. Becomes a prominent player in the Indian automotive and agricultural landscape.\n*   **1990s-2000s:** Undergoes significant diversification and expansion, including the establishment of Tech Mahindra and entry into new sectors like financial services and real estate. Global Expansion begins through exports and partnerships.\n*   **2010s-Present:** Focuses on innovation, electric vehicles, and sustainable solutions. Strengthens its position as a global conglomerate with a strong presence in India and an expanding international footprint. Major acquisitions and partnerships occur. For example, acquisition of SsangYong Motors (though later divested). Significant investment in electric vehicle technology and infrastructure.\n\n**Overall, Mahindra & Mahindra is a diversified conglomerate with a strong foundation in the automotive and farm equipment sectors. Its commitment to innovation, sustainability, and global expansion positions it for continued growth in the future. The company's diverse portfolio of businesses allows it to weather economic cycles and capitalize on emerging opportunities. M&M's strong brand reputation and focus on customer satisfaction have contributed to its success and enduring presence in the Indian and global markets.** They are undergoing a strategic shift towards electric vehicles and modern farming practices, aiming to remain relevant in the rapidly evolving global market."
                                },
                                "stats": {
                                    "profile_metrics": {
                                        "columns": [
                                            "metric",
                                            "value",
                                            "unit",
                                            "as_of"
                                        ],
                                        "values": [
                                            [
                                                "Market Cap",
                                                260000,
                                                "Crore INR",
                                                "2023-10-27"
                                            ],
                                            [
                                                "EV",
                                                280000,
                                                "Crore INR",
                                                "2023-10-27"
                                            ],
                                            [
                                                "Shares Out",
                                                1245,
                                                "Million",
                                                "2023-10-27"
                                            ],
                                            [
                                                "Revenue",
                                                138884,
                                                "Crore INR",
                                                "2023-03-31"
                                            ],
                                            [
                                                "Employees",
                                                50000,
                                                "People",
                                                "2023-01-01"
                                            ]
                                        ]
                                    },
                                    "margins_metrics": {
                                        "columns": [
                                            "metric",
                                            "value",
                                            "unit",
                                            "as_of"
                                        ],
                                        "values": [
                                            [
                                                "Gross",
                                                28.1,
                                                "%",
                                                "2023-03-31"
                                            ],
                                            [
                                                "EBITDA",
                                                13,
                                                "%",
                                                "2023-03-31"
                                            ],
                                            [
                                                "Operating",
                                                9.4,
                                                "%",
                                                "2023-03-31"
                                            ],
                                            [
                                                "Pre-Tax",
                                                7.9,
                                                "%",
                                                "2023-03-31"
                                            ],
                                            [
                                                "Net",
                                                6.5,
                                                "%",
                                                "2023-03-31"
                                            ],
                                            [
                                                "FCF",
                                                5.8,
                                                "%",
                                                "2023-03-31"
                                            ]
                                        ]
                                    },
                                    "returns_5yr_avg_metrics": {
                                        "columns": [
                                            "metric",
                                            "value",
                                            "unit",
                                            "as_of"
                                        ],
                                        "values": [
                                            [
                                                "ROA",
                                                7,
                                                "%",
                                                "2023-03-31"
                                            ],
                                            [
                                                "ROTA",
                                                7.5,
                                                "%",
                                                "2023-03-31"
                                            ],
                                            [
                                                "ROE",
                                                13.5,
                                                "%",
                                                "2023-03-31"
                                            ],
                                            [
                                                "ROCE",
                                                11,
                                                "%",
                                                "2023-03-31"
                                            ],
                                            [
                                                "ROIC",
                                                10.5,
                                                "%",
                                                "2023-03-31"
                                            ]
                                        ]
                                    },
                                    "valuation_ttm_metrics": {
                                        "columns": [
                                            "metric",
                                            "value",
                                            "unit",
                                            "as_of"
                                        ],
                                        "values": [
                                            [
                                                "P/E",
                                                29,
                                                "Times",
                                                "2023-10-27"
                                            ],
                                            [
                                                "P/B",
                                                3.25,
                                                "Times",
                                                "2023-10-27"
                                            ],
                                            [
                                                "EV/Sales",
                                                2,
                                                "Times",
                                                "2023-10-27"
                                            ],
                                            [
                                                "EV/EBITDA",
                                                15.5,
                                                "Times",
                                                "2023-10-27"
                                            ],
                                            [
                                                "P/FCF",
                                                32.5,
                                                "Times",
                                                "2023-10-27"
                                            ],
                                            [
                                                "EV/Gross Profit",
                                                7.2,
                                                "Times",
                                                "2023-10-27"
                                            ]
                                        ]
                                    },
                                    "valuation_ntm_metrics": {
                                        "columns": [
                                            "metric",
                                            "value",
                                            "unit",
                                            "as_of"
                                        ],
                                        "values": [
                                            [
                                                "Price Target",
                                                1750,
                                                "INR",
                                                "2023-10-27"
                                            ],
                                            [
                                                "P/E",
                                                25,
                                                "Times",
                                                "2023-10-27"
                                            ],
                                            [
                                                "PEG",
                                                1.8,
                                                "Times",
                                                "2023-10-27"
                                            ],
                                            [
                                                "EV/Sales",
                                                1.8,
                                                "Times",
                                                "2023-10-27"
                                            ],
                                            [
                                                "EV/EBITDA",
                                                13,
                                                "Times",
                                                "2023-10-27"
                                            ],
                                            [
                                                "P/FCF",
                                                28,
                                                "Times",
                                                "2023-10-27"
                                            ]
                                        ]
                                    },
                                    "financial_health_metrics": {
                                        "columns": [
                                            "metric",
                                            "value",
                                            "unit",
                                            "as_of"
                                        ],
                                        "values": [
                                            [
                                                "Cash",
                                                10000,
                                                "Crore INR",
                                                "2023-03-31"
                                            ],
                                            [
                                                "Net Debt",
                                                20000,
                                                "Crore INR",
                                                "2023-03-31"
                                            ],
                                            [
                                                "Debt/Equity",
                                                0.4,
                                                "Times",
                                                "2023-03-31"
                                            ],
                                            [
                                                "EBIT/Interest",
                                                6.5,
                                                "Times",
                                                "2023-03-31"
                                            ]
                                        ]
                                    },
                                    "growth_cagr_metrics": {
                                        "columns": [
                                            "metric",
                                            "value",
                                            "unit",
                                            "as_of"
                                        ],
                                        "values": [
                                            [
                                                "Rev 3Yr",
                                                15,
                                                "%",
                                                "2023-03-31"
                                            ],
                                            [
                                                "Rev 5Yr",
                                                12,
                                                "%",
                                                "2023-03-31"
                                            ],
                                            [
                                                "Rev 10Yr",
                                                10,
                                                "%",
                                                "2023-03-31"
                                            ],
                                            [
                                                "Dil EPS 3Yr",
                                                25,
                                                "%",
                                                "2023-03-31"
                                            ],
                                            [
                                                "Dil EPS 5Yr",
                                                18,
                                                "%",
                                                "2023-03-31"
                                            ],
                                            [
                                                "Dil EPS 10Yr",
                                                15,
                                                "%",
                                                "2023-03-31"
                                            ],
                                            [
                                                "Rev Fwd 2Yr",
                                                10,
                                                "%",
                                                "2023-10-27"
                                            ],
                                            [
                                                "EBITDA Fwd 2Yr",
                                                12,
                                                "%",
                                                "2023-10-27"
                                            ],
                                            [
                                                "EPS Fwd 2Yr",
                                                15,
                                                "%",
                                                "2023-10-27"
                                            ],
                                            [
                                                "EPS LT Growth Est",
                                                15,
                                                "%",
                                                "2023-10-27"
                                            ]
                                        ]
                                    }
                                }
                            }
                        ],
                        "chart_data": {
                            "plotly_json": "{\"data\":[{\"mode\":\"lines+markers\",\"name\":\"Infosys Limited - sales\",\"x\":[\"2015-03-31\",\"2016-03-31\",\"2017-03-31\",\"2018-03-31\",\"2019-03-31\",\"2020-03-31\",\"2021-03-31\",\"2022-03-31\",\"2023-03-31\",\"2024-03-31\"],\"y\":[53319.0,62441.0,68484.0,70522.0,82675.0,90791.0,100472.0,121641.0,146767.0,153670.0],\"type\":\"scatter\"},{\"mode\":\"lines+markers\",\"name\":\"Mahindra & Mahindra - sales\",\"x\":[\"2015-03-31\",\"2016-03-31\",\"2017-03-31\",\"2018-03-31\",\"2019-03-31\",\"2020-03-31\",\"2021-03-31\",\"2022-03-31\",\"2023-03-31\",\"2024-03-31\"],\"y\":[71448.0,75841.42,83773.05,92093.95,104720.68,75381.93,74277.78,90170.57,121268.55,139078.27],\"type\":\"scatter\"}],\"layout\":{\"template\":{\"data\":{\"histogram2dcontour\":[{\"type\":\"histogram2dcontour\",\"colorbar\":{\"outlinewidth\":0,\"ticks\":\"\"},\"colorscale\":[[0.0,\"#0d0887\"],[0.1111111111111111,\"#46039f\"],[0.2222222222222222,\"#7201a8\"],[0.3333333333333333,\"#9c179e\"],[0.4444444444444444,\"#bd3786\"],[0.5555555555555556,\"#d8576b\"],[0.6666666666666666,\"#ed7953\"],[0.7777777777777778,\"#fb9f3a\"],[0.8888888888888888,\"#fdca26\"],[1.0,\"#f0f921\"]]}],\"choropleth\":[{\"type\":\"choropleth\",\"colorbar\":{\"outlinewidth\":0,\"ticks\":\"\"}}],\"histogram2d\":[{\"type\":\"histogram2d\",\"colorbar\":{\"outlinewidth\":0,\"ticks\":\"\"},\"colorscale\":[[0.0,\"#0d0887\"],[0.1111111111111111,\"#46039f\"],[0.2222222222222222,\"#7201a8\"],[0.3333333333333333,\"#9c179e\"],[0.4444444444444444,\"#bd3786\"],[0.5555555555555556,\"#d8576b\"],[0.6666666666666666,\"#ed7953\"],[0.7777777777777778,\"#fb9f3a\"],[0.8888888888888888,\"#fdca26\"],[1.0,\"#f0f921\"]]}],\"heatmap\":[{\"type\":\"heatmap\",\"colorbar\":{\"outlinewidth\":0,\"ticks\":\"\"},\"colorscale\":[[0.0,\"#0d0887\"],[0.1111111111111111,\"#46039f\"],[0.2222222222222222,\"#7201a8\"],[0.3333333333333333,\"#9c179e\"],[0.4444444444444444,\"#bd3786\"],[0.5555555555555556,\"#d8576b\"],[0.6666666666666666,\"#ed7953\"],[0.7777777777777778,\"#fb9f3a\"],[0.8888888888888888,\"#fdca26\"],[1.0,\"#f0f921\"]]}],\"contourcarpet\":[{\"type\":\"contourcarpet\",\"colorbar\":{\"outlinewidth\":0,\"ticks\":\"\"}}],\"contour\":[{\"type\":\"contour\",\"colorbar\":{\"outlinewidth\":0,\"ticks\":\"\"},\"colorscale\":[[0.0,\"#0d0887\"],[0.1111111111111111,\"#46039f\"],[0.2222222222222222,\"#7201a8\"],[0.3333333333333333,\"#9c179e\"],[0.4444444444444444,\"#bd3786\"],[0.5555555555555556,\"#d8576b\"],[0.6666666666666666,\"#ed7953\"],[0.7777777777777778,\"#fb9f3a\"],[0.8888888888888888,\"#fdca26\"],[1.0,\"#f0f921\"]]}],\"surface\":[{\"type\":\"surface\",\"colorbar\":{\"outlinewidth\":0,\"ticks\":\"\"},\"colorscale\":[[0.0,\"#0d0887\"],[0.1111111111111111,\"#46039f\"],[0.2222222222222222,\"#7201a8\"],[0.3333333333333333,\"#9c179e\"],[0.4444444444444444,\"#bd3786\"],[0.5555555555555556,\"#d8576b\"],[0.6666666666666666,\"#ed7953\"],[0.7777777777777778,\"#fb9f3a\"],[0.8888888888888888,\"#fdca26\"],[1.0,\"#f0f921\"]]}],\"mesh3d\":[{\"type\":\"mesh3d\",\"colorbar\":{\"outlinewidth\":0,\"ticks\":\"\"}}],\"scatter\":[{\"fillpattern\":{\"fillmode\":\"overlay\",\"size\":10,\"solidity\":0.2},\"type\":\"scatter\"}],\"parcoords\":[{\"type\":\"parcoords\",\"line\":{\"colorbar\":{\"outlinewidth\":0,\"ticks\":\"\"}}}],\"scatterpolargl\":[{\"type\":\"scatterpolargl\",\"marker\":{\"colorbar\":{\"outlinewidth\":0,\"ticks\":\"\"}}}],\"bar\":[{\"error_x\":{\"color\":\"#2a3f5f\"},\"error_y\":{\"color\":\"#2a3f5f\"},\"marker\":{\"line\":{\"color\":\"#E5ECF6\",\"width\":0.5},\"pattern\":{\"fillmode\":\"overlay\",\"size\":10,\"solidity\":0.2}},\"type\":\"bar\"}],\"scattergeo\":[{\"type\":\"scattergeo\",\"marker\":{\"colorbar\":{\"outlinewidth\":0,\"ticks\":\"\"}}}],\"scatterpolar\":[{\"type\":\"scatterpolar\",\"marker\":{\"colorbar\":{\"outlinewidth\":0,\"ticks\":\"\"}}}],\"histogram\":[{\"marker\":{\"pattern\":{\"fillmode\":\"overlay\",\"size\":10,\"solidity\":0.2}},\"type\":\"histogram\"}],\"scattergl\":[{\"type\":\"scattergl\",\"marker\":{\"colorbar\":{\"outlinewidth\":0,\"ticks\":\"\"}}}],\"scatter3d\":[{\"type\":\"scatter3d\",\"line\":{\"colorbar\":{\"outlinewidth\":0,\"ticks\":\"\"}},\"marker\":{\"colorbar\":{\"outlinewidth\":0,\"ticks\":\"\"}}}],\"scattermap\":[{\"type\":\"scattermap\",\"marker\":{\"colorbar\":{\"outlinewidth\":0,\"ticks\":\"\"}}}],\"scattermapbox\":[{\"type\":\"scattermapbox\",\"marker\":{\"colorbar\":{\"outlinewidth\":0,\"ticks\":\"\"}}}],\"scatterternary\":[{\"type\":\"scatterternary\",\"marker\":{\"colorbar\":{\"outlinewidth\":0,\"ticks\":\"\"}}}],\"scattercarpet\":[{\"type\":\"scattercarpet\",\"marker\":{\"colorbar\":{\"outlinewidth\":0,\"ticks\":\"\"}}}],\"carpet\":[{\"aaxis\":{\"endlinecolor\":\"#2a3f5f\",\"gridcolor\":\"white\",\"linecolor\":\"white\",\"minorgridcolor\":\"white\",\"startlinecolor\":\"#2a3f5f\"},\"baxis\":{\"endlinecolor\":\"#2a3f5f\",\"gridcolor\":\"white\",\"linecolor\":\"white\",\"minorgridcolor\":\"white\",\"startlinecolor\":\"#2a3f5f\"},\"type\":\"carpet\"}],\"table\":[{\"cells\":{\"fill\":{\"color\":\"#EBF0F8\"},\"line\":{\"color\":\"white\"}},\"header\":{\"fill\":{\"color\":\"#C8D4E3\"},\"line\":{\"color\":\"white\"}},\"type\":\"table\"}],\"barpolar\":[{\"marker\":{\"line\":{\"color\":\"#E5ECF6\",\"width\":0.5},\"pattern\":{\"fillmode\":\"overlay\",\"size\":10,\"solidity\":0.2}},\"type\":\"barpolar\"}],\"pie\":[{\"automargin\":true,\"type\":\"pie\"}]},\"layout\":{\"autotypenumbers\":\"strict\",\"colorway\":[\"#636efa\",\"#EF553B\",\"#00cc96\",\"#ab63fa\",\"#FFA15A\",\"#19d3f3\",\"#FF6692\",\"#B6E880\",\"#FF97FF\",\"#FECB52\"],\"font\":{\"color\":\"#2a3f5f\"},\"hovermode\":\"closest\",\"hoverlabel\":{\"align\":\"left\"},\"paper_bgcolor\":\"white\",\"plot_bgcolor\":\"#E5ECF6\",\"polar\":{\"bgcolor\":\"#E5ECF6\",\"angularaxis\":{\"gridcolor\":\"white\",\"linecolor\":\"white\",\"ticks\":\"\"},\"radialaxis\":{\"gridcolor\":\"white\",\"linecolor\":\"white\",\"ticks\":\"\"}},\"ternary\":{\"bgcolor\":\"#E5ECF6\",\"aaxis\":{\"gridcolor\":\"white\",\"linecolor\":\"white\",\"ticks\":\"\"},\"baxis\":{\"gridcolor\":\"white\",\"linecolor\":\"white\",\"ticks\":\"\"},\"caxis\":{\"gridcolor\":\"white\",\"linecolor\":\"white\",\"ticks\":\"\"}},\"coloraxis\":{\"colorbar\":{\"outlinewidth\":0,\"ticks\":\"\"}},\"colorscale\":{\"sequential\":[[0.0,\"#0d0887\"],[0.1111111111111111,\"#46039f\"],[0.2222222222222222,\"#7201a8\"],[0.3333333333333333,\"#9c179e\"],[0.4444444444444444,\"#bd3786\"],[0.5555555555555556,\"#d8576b\"],[0.6666666666666666,\"#ed7953\"],[0.7777777777777778,\"#fb9f3a\"],[0.8888888888888888,\"#fdca26\"],[1.0,\"#f0f921\"]],\"sequentialminus\":[[0.0,\"#0d0887\"],[0.1111111111111111,\"#46039f\"],[0.2222222222222222,\"#7201a8\"],[0.3333333333333333,\"#9c179e\"],[0.4444444444444444,\"#bd3786\"],[0.5555555555555556,\"#d8576b\"],[0.6666666666666666,\"#ed7953\"],[0.7777777777777778,\"#fb9f3a\"],[0.8888888888888888,\"#fdca26\"],[1.0,\"#f0f921\"]],\"diverging\":[[0,\"#8e0152\"],[0.1,\"#c51b7d\"],[0.2,\"#de77ae\"],[0.3,\"#f1b6da\"],[0.4,\"#fde0ef\"],[0.5,\"#f7f7f7\"],[0.6,\"#e6f5d0\"],[0.7,\"#b8e186\"],[0.8,\"#7fbc41\"],[0.9,\"#4d9221\"],[1,\"#276419\"]]},\"xaxis\":{\"gridcolor\":\"white\",\"linecolor\":\"white\",\"ticks\":\"\",\"title\":{\"standoff\":15},\"zerolinecolor\":\"white\",\"automargin\":true,\"zerolinewidth\":2},\"yaxis\":{\"gridcolor\":\"white\",\"linecolor\":\"white\",\"ticks\":\"\",\"title\":{\"standoff\":15},\"zerolinecolor\":\"white\",\"automargin\":true,\"zerolinewidth\":2},\"scene\":{\"xaxis\":{\"backgroundcolor\":\"#E5ECF6\",\"gridcolor\":\"white\",\"linecolor\":\"white\",\"showbackground\":true,\"ticks\":\"\",\"zerolinecolor\":\"white\",\"gridwidth\":2},\"yaxis\":{\"backgroundcolor\":\"#E5ECF6\",\"gridcolor\":\"white\",\"linecolor\":\"white\",\"showbackground\":true,\"ticks\":\"\",\"zerolinecolor\":\"white\",\"gridwidth\":2},\"zaxis\":{\"backgroundcolor\":\"#E5ECF6\",\"gridcolor\":\"white\",\"linecolor\":\"white\",\"showbackground\":true,\"ticks\":\"\",\"zerolinecolor\":\"white\",\"gridwidth\":2}},\"shapedefaults\":{\"line\":{\"color\":\"#2a3f5f\"}},\"annotationdefaults\":{\"arrowcolor\":\"#2a3f5f\",\"arrowhead\":0,\"arrowwidth\":1},\"geo\":{\"bgcolor\":\"white\",\"landcolor\":\"#E5ECF6\",\"subunitcolor\":\"white\",\"showland\":true,\"showlakes\":true,\"lakecolor\":\"white\"},\"title\":{\"x\":0.05},\"mapbox\":{\"style\":\"light\"}}},\"title\":{\"text\":\"Financial Parameter Chart\"},\"xaxis\":{\"title\":{\"text\":\"Date\"}},\"yaxis\":{\"title\":{\"text\":\"Value\"}},\"legend\":{\"title\":{\"text\":\"Company - Parameter\"}}}}"
                        },
                        "financial_data": [
                            {
                                "company": "Infosys Limited",
                                "statement_type": "profit_and_loss",
                                "data": [
                                    {
                                        "id": 3398,
                                        "company_id": 27,
                                        "report_date": "2021-03-31",
                                        "parameter": "Depreciation",
                                        "value": 3267,
                                        "created_at": "2025-05-15T12:29:46.558731",
                                        "updated_at": "2025-05-22T09:27:45.213255"
                                    },
                                    {
                                        "id": 3403,
                                        "company_id": 27,
                                        "report_date": "2021-03-31",
                                        "parameter": "Dividend Amount",
                                        "value": 11469.6,
                                        "created_at": "2025-05-15T12:29:46.558731",
                                        "updated_at": "2025-05-22T09:27:45.213255"
                                    },
                                    {
                                        "id": 3394,
                                        "company_id": 27,
                                        "report_date": "2021-03-31",
                                        "parameter": "Employee Cost",
                                        "value": 55547,
                                        "created_at": "2025-05-15T12:29:46.558731",
                                        "updated_at": "2025-05-22T09:27:45.213255"
                                    },
                                    {
                                        "id": 3399,
                                        "company_id": 27,
                                        "report_date": "2021-03-31",
                                        "parameter": "Interest",
                                        "value": 195,
                                        "created_at": "2025-05-15T12:29:46.558731",
                                        "updated_at": "2025-05-22T09:27:45.213255"
                                    },
                                    {
                                        "id": 3402,
                                        "company_id": 27,
                                        "report_date": "2021-03-31",
                                        "parameter": "Net profit",
                                        "value": 19351,
                                        "created_at": "2025-05-15T12:29:46.558731",
                                        "updated_at": "2025-05-22T09:27:45.213255"
                                    },
                                    {
                                        "id": 3396,
                                        "company_id": 27,
                                        "report_date": "2021-03-31",
                                        "parameter": "Other Expenses",
                                        "value": 899,
                                        "created_at": "2025-05-15T12:29:46.558731",
                                        "updated_at": "2025-05-22T09:27:45.213255"
                                    },
                                    {
                                        "id": 3397,
                                        "company_id": 27,
                                        "report_date": "2021-03-31",
                                        "parameter": "Other Income",
                                        "value": 2201,
                                        "created_at": "2025-05-15T12:29:46.558731",
                                        "updated_at": "2025-05-22T09:27:45.213255"
                                    },
                                    {
                                        "id": 3393,
                                        "company_id": 27,
                                        "report_date": "2021-03-31",
                                        "parameter": "Other Mfr. Exp",
                                        "value": 12800,
                                        "created_at": "2025-05-15T12:29:46.558731",
                                        "updated_at": "2025-05-22T09:27:45.213255"
                                    },
                                    {
                                        "id": 3392,
                                        "company_id": 27,
                                        "report_date": "2021-03-31",
                                        "parameter": "Power and Fuel",
                                        "value": 143,
                                        "created_at": "2025-05-15T12:29:46.558731",
                                        "updated_at": "2025-05-22T09:27:45.213255"
                                    },
                                    {
                                        "id": 3400,
                                        "company_id": 27,
                                        "report_date": "2021-03-31",
                                        "parameter": "Profit before tax",
                                        "value": 26628,
                                        "created_at": "2025-05-15T12:29:46.558731",
                                        "updated_at": "2025-05-22T09:27:45.213255"
                                    },
                                    {
                                        "id": 3391,
                                        "company_id": 27,
                                        "report_date": "2021-03-31",
                                        "parameter": "Sales",
                                        "value": 100472,
                                        "created_at": "2025-05-15T12:29:46.558731",
                                        "updated_at": "2025-05-22T09:27:45.213255"
                                    },
                                    {
                                        "id": 3395,
                                        "company_id": 27,
                                        "report_date": "2021-03-31",
                                        "parameter": "Selling and admin",
                                        "value": 3194,
                                        "created_at": "2025-05-15T12:29:46.558731",
                                        "updated_at": "2025-05-22T09:27:45.213255"
                                    },
                                    {
                                        "id": 3401,
                                        "company_id": 27,
                                        "report_date": "2021-03-31",
                                        "parameter": "Tax",
                                        "value": 7205,
                                        "created_at": "2025-05-15T12:29:46.558731",
                                        "updated_at": "2025-05-22T09:27:45.213255"
                                    },
                                    {
                                        "id": 17797,
                                        "company_id": 127,
                                        "report_date": "2021-03-31",
                                        "parameter": "Employee Cost %",
                                        "value": 55,
                                        "created_at": "2025-05-15T12:29:46.558731",
                                        "updated_at": "2025-05-22T09:27:45.213255"
                                    },
                                    {
                                        "id": 17821,
                                        "company_id": 127,
                                        "report_date": "2021-03-31",
                                        "parameter": "Exceptional items",
                                        "value": 74,
                                        "created_at": "2025-05-15T12:29:46.558731",
                                        "updated_at": "2025-05-22T09:27:45.213255"
                                    },
                                    {
                                        "id": 17905,
                                        "company_id": 127,
                                        "report_date": "2021-03-31",
                                        "parameter": "Exceptional items AT",
                                        "value": 54,
                                        "created_at": "2025-05-15T12:29:46.558731",
                                        "updated_at": "2025-05-22T09:27:45.213255"
                                    },
                                    {
                                        "id": 17785,
                                        "company_id": 127,
                                        "report_date": "2021-03-31",
                                        "parameter": "Manufacturing Cost %",
                                        "value": 13,
                                        "created_at": "2025-05-15T12:29:46.558731",
                                        "updated_at": "2025-05-22T09:27:45.213255"
                                    },
                                    {
                                        "id": 17881,
                                        "company_id": 127,
                                        "report_date": "2021-03-31",
                                        "parameter": "Minority share",
                                        "value": -72,
                                        "created_at": "2025-05-15T12:29:46.558731",
                                        "updated_at": "2025-05-22T09:27:45.213255"
                                    },
                                    {
                                        "id": 17809,
                                        "company_id": 127,
                                        "report_date": "2021-03-31",
                                        "parameter": "Other Cost %",
                                        "value": 4,
                                        "created_at": "2025-05-15T12:29:46.558731",
                                        "updated_at": "2025-05-22T09:27:45.213255"
                                    },
                                    {
                                        "id": 17833,
                                        "company_id": 127,
                                        "report_date": "2021-03-31",
                                        "parameter": "Other income normal",
                                        "value": 2127,
                                        "created_at": "2025-05-15T12:29:46.558731",
                                        "updated_at": "2025-05-22T09:27:45.213255"
                                    },
                                    {
                                        "id": 17845,
                                        "company_id": 127,
                                        "report_date": "2021-03-31",
                                        "parameter": "Profit after tax",
                                        "value": 19423,
                                        "created_at": "2025-05-15T12:29:46.558731",
                                        "updated_at": "2025-05-22T09:27:45.213255"
                                    },
                                    {
                                        "id": 17893,
                                        "company_id": 127,
                                        "report_date": "2021-03-31",
                                        "parameter": "Profit for EPS",
                                        "value": 19351,
                                        "created_at": "2025-05-15T12:29:46.558731",
                                        "updated_at": "2025-05-22T09:27:45.213255"
                                    },
                                    {
                                        "id": 17917,
                                        "company_id": 127,
                                        "report_date": "2021-03-31",
                                        "parameter": "Profit for PE",
                                        "value": 19297,
                                        "created_at": "2025-05-15T12:29:46.558731",
                                        "updated_at": "2025-05-22T09:27:45.213255"
                                    },
                                    {
                                        "id": 17857,
                                        "company_id": 127,
                                        "report_date": "2021-03-31",
                                        "parameter": "Profit from Associates",
                                        "value": 0,
                                        "created_at": "2025-05-15T12:29:46.558731",
                                        "updated_at": "2025-05-22T09:27:45.213255"
                                    },
                                    {
                                        "id": 17869,
                                        "company_id": 127,
                                        "report_date": "2021-03-31",
                                        "parameter": "Reported Net Profit",
                                        "value": 19423,
                                        "created_at": "2025-05-15T12:29:46.558731",
                                        "updated_at": "2025-05-22T09:27:45.213255"
                                    },
                                    {
                                        "id": 17773,
                                        "company_id": 127,
                                        "report_date": "2021-03-31",
                                        "parameter": "Sales Growth %",
                                        "value": 10.66,
                                        "created_at": "2025-05-15T12:29:46.558731",
                                        "updated_at": "2025-05-22T09:27:45.213255"
                                    },
                                    {
                                        "id": 3414,
                                        "company_id": 27,
                                        "report_date": "2022-03-31",
                                        "parameter": "Tax",
                                        "value": 7964,
                                        "created_at": "2025-05-15T12:29:46.558731",
                                        "updated_at": "2025-05-22T09:27:45.213255"
                                    },
                                    {
                                        "id": 17798,
                                        "company_id": 127,
                                        "report_date": "2022-03-31",
                                        "parameter": "Employee Cost %",
                                        "value": 53,
                                        "created_at": "2025-05-15T12:29:46.558731",
                                        "updated_at": "2025-05-22T09:27:45.213255"
                                    },
                                    {
                                        "id": 17822,
                                        "company_id": 127,
                                        "report_date": "2022-03-31",
                                        "parameter": "Exceptional items",
                                        "value": 177,
                                        "created_at": "2025-05-15T12:29:46.558731",
                                        "updated_at": "2025-05-22T09:27:45.213255"
                                    },
                                    {
                                        "id": 17906,
                                        "company_id": 127,
                                        "report_date": "2022-03-31",
                                        "parameter": "Exceptional items AT",
                                        "value": 130,
                                        "created_at": "2025-05-15T12:29:46.558731",
                                        "updated_at": "2025-05-22T09:27:45.213255"
                                    },
                                    {
                                        "id": 17786,
                                        "company_id": 127,
                                        "report_date": "2022-03-31",
                                        "parameter": "Manufacturing Cost %",
                                        "value": 17,
                                        "created_at": "2025-05-15T12:29:46.558731",
                                        "updated_at": "2025-05-22T09:27:45.213255"
                                    },
                                    {
                                        "id": 17882,
                                        "company_id": 127,
                                        "report_date": "2022-03-31",
                                        "parameter": "Minority share",
                                        "value": -36,
                                        "created_at": "2025-05-15T12:29:46.558731",
                                        "updated_at": "2025-05-22T09:27:45.213255"
                                    },
                                    {
                                        "id": 17810,
                                        "company_id": 127,
                                        "report_date": "2022-03-31",
                                        "parameter": "Other Cost %",
                                        "value": 4,
                                        "created_at": "2025-05-15T12:29:46.558731",
                                        "updated_at": "2025-05-22T09:27:45.213255"
                                    },
                                    {
                                        "id": 17834,
                                        "company_id": 127,
                                        "report_date": "2022-03-31",
                                        "parameter": "Other income normal",
                                        "value": 2118,
                                        "created_at": "2025-05-15T12:29:46.558731",
                                        "updated_at": "2025-05-22T09:27:45.213255"
                                    },
                                    {
                                        "id": 17846,
                                        "company_id": 127,
                                        "report_date": "2022-03-31",
                                        "parameter": "Profit after tax",
                                        "value": 22146,
                                        "created_at": "2025-05-15T12:29:46.558731",
                                        "updated_at": "2025-05-22T09:27:45.213255"
                                    },
                                    {
                                        "id": 17894,
                                        "company_id": 127,
                                        "report_date": "2022-03-31",
                                        "parameter": "Profit for EPS",
                                        "value": 22110,
                                        "created_at": "2025-05-15T12:29:46.558731",
                                        "updated_at": "2025-05-22T09:27:45.213255"
                                    },
                                    {
                                        "id": 17918,
                                        "company_id": 127,
                                        "report_date": "2022-03-31",
                                        "parameter": "Profit for PE",
                                        "value": 21980,
                                        "created_at": "2025-05-15T12:29:46.558731",
                                        "updated_at": "2025-05-22T09:27:45.213255"
                                    },
                                    {
                                        "id": 17858,
                                        "company_id": 127,
                                        "report_date": "2022-03-31",
                                        "parameter": "Profit from Associates",
                                        "value": 0,
                                        "created_at": "2025-05-15T12:29:46.558731",
                                        "updated_at": "2025-05-22T09:27:45.213255"
                                    },
                                    {
                                        "id": 17870,
                                        "company_id": 127,
                                        "report_date": "2022-03-31",
                                        "parameter": "Reported Net Profit",
                                        "value": 22146,
                                        "created_at": "2025-05-15T12:29:46.558731",
                                        "updated_at": "2025-05-22T09:27:45.213255"
                                    },
                                    {
                                        "id": 17774,
                                        "company_id": 127,
                                        "report_date": "2022-03-31",
                                        "parameter": "Sales Growth %",
                                        "value": 21.07,
                                        "created_at": "2025-05-15T12:29:46.558731",
                                        "updated_at": "2025-05-22T09:27:45.213255"
                                    },
                                    {
                                        "id": 3411,
                                        "company_id": 27,
                                        "report_date": "2022-03-31",
                                        "parameter": "Depreciation",
                                        "value": 3476,
                                        "created_at": "2025-05-15T12:29:46.558731",
                                        "updated_at": "2025-05-22T09:27:45.213255"
                                    },
                                    {
                                        "id": 3416,
                                        "company_id": 27,
                                        "report_date": "2022-03-31",
                                        "parameter": "Dividend Amount",
                                        "value": 13007.6,
                                        "created_at": "2025-05-15T12:29:46.558731",
                                        "updated_at": "2025-05-22T09:27:45.213255"
                                    },
                                    {
                                        "id": 3407,
                                        "company_id": 27,
                                        "report_date": "2022-03-31",
                                        "parameter": "Employee Cost",
                                        "value": 63997,
                                        "created_at": "2025-05-15T12:29:46.558731",
                                        "updated_at": "2025-05-22T09:27:45.213255"
                                    },
                                    {
                                        "id": 3412,
                                        "company_id": 27,
                                        "report_date": "2022-03-31",
                                        "parameter": "Interest",
                                        "value": 200,
                                        "created_at": "2025-05-15T12:29:46.558731",
                                        "updated_at": "2025-05-22T09:27:45.213255"
                                    },
                                    {
                                        "id": 3415,
                                        "company_id": 27,
                                        "report_date": "2022-03-31",
                                        "parameter": "Net profit",
                                        "value": 22110,
                                        "created_at": "2025-05-15T12:29:46.558731",
                                        "updated_at": "2025-05-22T09:27:45.213255"
                                    },
                                    {
                                        "id": 3409,
                                        "company_id": 27,
                                        "report_date": "2022-03-31",
                                        "parameter": "Other Expenses",
                                        "value": 1026,
                                        "created_at": "2025-05-15T12:29:46.558731",
                                        "updated_at": "2025-05-22T09:27:45.213255"
                                    },
                                    {
                                        "id": 3410,
                                        "company_id": 27,
                                        "report_date": "2022-03-31",
                                        "parameter": "Other Income",
                                        "value": 2295,
                                        "created_at": "2025-05-15T12:29:46.558731",
                                        "updated_at": "2025-05-22T09:27:45.213255"
                                    },
                                    {
                                        "id": 3406,
                                        "company_id": 27,
                                        "report_date": "2022-03-31",
                                        "parameter": "Other Mfr. Exp",
                                        "value": 20690,
                                        "created_at": "2025-05-15T12:29:46.558731",
                                        "updated_at": "2025-05-22T09:27:45.213255"
                                    },
                                    {
                                        "id": 3405,
                                        "company_id": 27,
                                        "report_date": "2022-03-31",
                                        "parameter": "Power and Fuel",
                                        "value": 132,
                                        "created_at": "2025-05-15T12:29:46.558731",
                                        "updated_at": "2025-05-22T09:27:45.213255"
                                    },
                                    {
                                        "id": 3413,
                                        "company_id": 27,
                                        "report_date": "2022-03-31",
                                        "parameter": "Profit before tax",
                                        "value": 30110,
                                        "created_at": "2025-05-15T12:29:46.558731",
                                        "updated_at": "2025-05-22T09:27:45.213255"
                                    },
                                    {
                                        "id": 3404,
                                        "company_id": 27,
                                        "report_date": "2022-03-31",
                                        "parameter": "Sales",
                                        "value": 121641,
                                        "created_at": "2025-05-15T12:29:46.558731",
                                        "updated_at": "2025-05-22T09:27:45.213255"
                                    },
                                    {
                                        "id": 3408,
                                        "company_id": 27,
                                        "report_date": "2022-03-31",
                                        "parameter": "Selling and admin",
                                        "value": 4305,
                                        "created_at": "2025-05-15T12:29:46.558731",
                                        "updated_at": "2025-05-22T09:27:45.213255"
                                    },
                                    {
                                        "id": 3424,
                                        "company_id": 27,
                                        "report_date": "2023-03-31",
                                        "parameter": "Depreciation",
                                        "value": 4225,
                                        "created_at": "2025-05-15T12:29:46.558731",
                                        "updated_at": "2025-05-22T09:27:45.213255"
                                    },
                                    {
                                        "id": 3429,
                                        "company_id": 27,
                                        "report_date": "2023-03-31",
                                        "parameter": "Dividend Amount",
                                        "value": 14069.2,
                                        "created_at": "2025-05-15T12:29:46.558731",
                                        "updated_at": "2025-05-22T09:27:45.213255"
                                    },
                                    {
                                        "id": 3420,
                                        "company_id": 27,
                                        "report_date": "2023-03-31",
                                        "parameter": "Employee Cost",
                                        "value": 78374,
                                        "created_at": "2025-05-15T12:29:46.558731",
                                        "updated_at": "2025-05-22T09:27:45.213255"
                                    },
                                    {
                                        "id": 3425,
                                        "company_id": 27,
                                        "report_date": "2023-03-31",
                                        "parameter": "Interest",
                                        "value": 284,
                                        "created_at": "2025-05-15T12:29:46.558731",
                                        "updated_at": "2025-05-22T09:27:45.213255"
                                    },
                                    {
                                        "id": 3428,
                                        "company_id": 27,
                                        "report_date": "2023-03-31",
                                        "parameter": "Net profit",
                                        "value": 24095,
                                        "created_at": "2025-05-15T12:29:46.558731",
                                        "updated_at": "2025-05-22T09:27:45.213255"
                                    },
                                    {
                                        "id": 3422,
                                        "company_id": 27,
                                        "report_date": "2023-03-31",
                                        "parameter": "Other Expenses",
                                        "value": 1457,
                                        "created_at": "2025-05-15T12:29:46.558731",
                                        "updated_at": "2025-05-22T09:27:45.213255"
                                    },
                                    {
                                        "id": 3423,
                                        "company_id": 27,
                                        "report_date": "2023-03-31",
                                        "parameter": "Other Income",
                                        "value": 2701,
                                        "created_at": "2025-05-15T12:29:46.558731",
                                        "updated_at": "2025-05-22T09:27:45.213255"
                                    },
                                    {
                                        "id": 3419,
                                        "company_id": 27,
                                        "report_date": "2023-03-31",
                                        "parameter": "Other Mfr. Exp",
                                        "value": 26330,
                                        "created_at": "2025-05-15T12:29:46.558731",
                                        "updated_at": "2025-05-22T09:27:45.213255"
                                    },
                                    {
                                        "id": 3418,
                                        "company_id": 27,
                                        "report_date": "2023-03-31",
                                        "parameter": "Power and Fuel",
                                        "value": 176,
                                        "created_at": "2025-05-15T12:29:46.558731",
                                        "updated_at": "2025-05-22T09:27:45.213255"
                                    },
                                    {
                                        "id": 3426,
                                        "company_id": 27,
                                        "report_date": "2023-03-31",
                                        "parameter": "Profit before tax",
                                        "value": 33322,
                                        "created_at": "2025-05-15T12:29:46.558731",
                                        "updated_at": "2025-05-22T09:27:45.213255"
                                    },
                                    {
                                        "id": 3417,
                                        "company_id": 27,
                                        "report_date": "2023-03-31",
                                        "parameter": "Sales",
                                        "value": 146767,
                                        "created_at": "2025-05-15T12:29:46.558731",
                                        "updated_at": "2025-05-22T09:27:45.213255"
                                    },
                                    {
                                        "id": 3421,
                                        "company_id": 27,
                                        "report_date": "2023-03-31",
                                        "parameter": "Selling and admin",
                                        "value": 5300,
                                        "created_at": "2025-05-15T12:29:46.558731",
                                        "updated_at": "2025-05-22T09:27:45.213255"
                                    },
                                    {
                                        "id": 3427,
                                        "company_id": 27,
                                        "report_date": "2023-03-31",
                                        "parameter": "Tax",
                                        "value": 9214,
                                        "created_at": "2025-05-15T12:29:46.558731",
                                        "updated_at": "2025-05-22T09:27:45.213255"
                                    },
                                    {
                                        "id": 17799,
                                        "company_id": 127,
                                        "report_date": "2023-03-31",
                                        "parameter": "Employee Cost %",
                                        "value": 53,
                                        "created_at": "2025-05-15T12:29:46.558731",
                                        "updated_at": "2025-05-22T09:27:45.213255"
                                    },
                                    {
                                        "id": 17823,
                                        "company_id": 127,
                                        "report_date": "2023-03-31",
                                        "parameter": "Exceptional items",
                                        "value": 148,
                                        "created_at": "2025-05-15T12:29:46.558731",
                                        "updated_at": "2025-05-22T09:27:45.213255"
                                    },
                                    {
                                        "id": 17907,
                                        "company_id": 127,
                                        "report_date": "2023-03-31",
                                        "parameter": "Exceptional items AT",
                                        "value": 107,
                                        "created_at": "2025-05-15T12:29:46.558731",
                                        "updated_at": "2025-05-22T09:27:45.213255"
                                    },
                                    {
                                        "id": 17787,
                                        "company_id": 127,
                                        "report_date": "2023-03-31",
                                        "parameter": "Manufacturing Cost %",
                                        "value": 18,
                                        "created_at": "2025-05-15T12:29:46.558731",
                                        "updated_at": "2025-05-22T09:27:45.213255"
                                    },
                                    {
                                        "id": 17883,
                                        "company_id": 127,
                                        "report_date": "2023-03-31",
                                        "parameter": "Minority share",
                                        "value": -13,
                                        "created_at": "2025-05-15T12:29:46.558731",
                                        "updated_at": "2025-05-22T09:27:45.213255"
                                    },
                                    {
                                        "id": 17811,
                                        "company_id": 127,
                                        "report_date": "2023-03-31",
                                        "parameter": "Other Cost %",
                                        "value": 5,
                                        "created_at": "2025-05-15T12:29:46.558731",
                                        "updated_at": "2025-05-22T09:27:45.213255"
                                    },
                                    {
                                        "id": 17835,
                                        "company_id": 127,
                                        "report_date": "2023-03-31",
                                        "parameter": "Other income normal",
                                        "value": 2553,
                                        "created_at": "2025-05-15T12:29:46.558731",
                                        "updated_at": "2025-05-22T09:27:45.213255"
                                    },
                                    {
                                        "id": 17847,
                                        "company_id": 127,
                                        "report_date": "2023-03-31",
                                        "parameter": "Profit after tax",
                                        "value": 24108,
                                        "created_at": "2025-05-15T12:29:46.558731",
                                        "updated_at": "2025-05-22T09:27:45.213255"
                                    },
                                    {
                                        "id": 17895,
                                        "company_id": 127,
                                        "report_date": "2023-03-31",
                                        "parameter": "Profit for EPS",
                                        "value": 24095,
                                        "created_at": "2025-05-15T12:29:46.558731",
                                        "updated_at": "2025-05-22T09:27:45.213255"
                                    },
                                    {
                                        "id": 17919,
                                        "company_id": 127,
                                        "report_date": "2023-03-31",
                                        "parameter": "Profit for PE",
                                        "value": 23988,
                                        "created_at": "2025-05-15T12:29:46.558731",
                                        "updated_at": "2025-05-22T09:27:45.213255"
                                    },
                                    {
                                        "id": 17859,
                                        "company_id": 127,
                                        "report_date": "2023-03-31",
                                        "parameter": "Profit from Associates",
                                        "value": 0,
                                        "created_at": "2025-05-15T12:29:46.558731",
                                        "updated_at": "2025-05-22T09:27:45.213255"
                                    },
                                    {
                                        "id": 17871,
                                        "company_id": 127,
                                        "report_date": "2023-03-31",
                                        "parameter": "Reported Net Profit",
                                        "value": 24108,
                                        "created_at": "2025-05-15T12:29:46.558731",
                                        "updated_at": "2025-05-22T09:27:45.213255"
                                    },
                                    {
                                        "id": 17775,
                                        "company_id": 127,
                                        "report_date": "2023-03-31",
                                        "parameter": "Sales Growth %",
                                        "value": 20.66,
                                        "created_at": "2025-05-15T12:29:46.558731",
                                        "updated_at": "2025-05-22T09:27:45.213255"
                                    }
                                ]
                            },
                            {
                                "company": "Mahindra & Mahindra",
                                "statement_type": "profit_and_loss",
                                "data": [
                                    {
                                        "id": 19927,
                                        "company_id": 141,
                                        "report_date": "2021-03-31",
                                        "parameter": "Sales Growth %",
                                        "value": -1.46,
                                        "created_at": "2025-05-15T12:29:46.558731",
                                        "updated_at": "2025-05-22T09:27:45.213255"
                                    },
                                    {
                                        "id": 6254,
                                        "company_id": 47,
                                        "report_date": "2021-03-31",
                                        "parameter": "Depreciation",
                                        "value": 3378.11,
                                        "created_at": "2025-05-15T12:29:46.558731",
                                        "updated_at": "2025-05-22T09:27:45.213255"
                                    },
                                    {
                                        "id": 6259,
                                        "company_id": 47,
                                        "report_date": "2021-03-31",
                                        "parameter": "Dividend Amount",
                                        "value": 971.51,
                                        "created_at": "2025-05-15T12:29:46.558731",
                                        "updated_at": "2025-05-22T09:27:45.213255"
                                    },
                                    {
                                        "id": 6250,
                                        "company_id": 47,
                                        "report_date": "2021-03-31",
                                        "parameter": "Employee Cost",
                                        "value": 7813.26,
                                        "created_at": "2025-05-15T12:29:46.558731",
                                        "updated_at": "2025-05-22T09:27:45.213255"
                                    },
                                    {
                                        "id": 6255,
                                        "company_id": 47,
                                        "report_date": "2021-03-31",
                                        "parameter": "Interest",
                                        "value": 6102.22,
                                        "created_at": "2025-05-15T12:29:46.558731",
                                        "updated_at": "2025-05-22T09:27:45.213255"
                                    },
                                    {
                                        "id": 6258,
                                        "company_id": 47,
                                        "report_date": "2021-03-31",
                                        "parameter": "Net profit",
                                        "value": 1812.49,
                                        "created_at": "2025-05-15T12:29:46.558731",
                                        "updated_at": "2025-05-22T09:27:45.213255"
                                    },
                                    {
                                        "id": 6252,
                                        "company_id": 47,
                                        "report_date": "2021-03-31",
                                        "parameter": "Other Expenses",
                                        "value": 8989,
                                        "created_at": "2025-05-15T12:29:46.558731",
                                        "updated_at": "2025-05-22T09:27:45.213255"
                                    },
                                    {
                                        "id": 6253,
                                        "company_id": 47,
                                        "report_date": "2021-03-31",
                                        "parameter": "Other Income",
                                        "value": 1151.51,
                                        "created_at": "2025-05-15T12:29:46.558731",
                                        "updated_at": "2025-05-22T09:27:45.213255"
                                    },
                                    {
                                        "id": 6249,
                                        "company_id": 47,
                                        "report_date": "2021-03-31",
                                        "parameter": "Other Mfr. Exp",
                                        "value": 2523.4,
                                        "created_at": "2025-05-15T12:29:46.558731",
                                        "updated_at": "2025-05-22T09:27:45.213255"
                                    },
                                    {
                                        "id": 6248,
                                        "company_id": 47,
                                        "report_date": "2021-03-31",
                                        "parameter": "Power and Fuel",
                                        "value": 429.56,
                                        "created_at": "2025-05-15T12:29:46.558731",
                                        "updated_at": "2025-05-22T09:27:45.213255"
                                    },
                                    {
                                        "id": 6256,
                                        "company_id": 47,
                                        "report_date": "2021-03-31",
                                        "parameter": "Profit before tax",
                                        "value": 3158.2,
                                        "created_at": "2025-05-15T12:29:46.558731",
                                        "updated_at": "2025-05-22T09:27:45.213255"
                                    },
                                    {
                                        "id": 6246,
                                        "company_id": 47,
                                        "report_date": "2021-03-31",
                                        "parameter": "Raw Material Cost",
                                        "value": 38271.2,
                                        "created_at": "2025-05-15T12:29:46.558731",
                                        "updated_at": "2025-05-22T09:27:45.213255"
                                    },
                                    {
                                        "id": 6245,
                                        "company_id": 47,
                                        "report_date": "2021-03-31",
                                        "parameter": "Sales",
                                        "value": 74277.78,
                                        "created_at": "2025-05-15T12:29:46.558731",
                                        "updated_at": "2025-05-22T09:27:45.213255"
                                    },
                                    {
                                        "id": 6251,
                                        "company_id": 47,
                                        "report_date": "2021-03-31",
                                        "parameter": "Selling and admin",
                                        "value": 4628.75,
                                        "created_at": "2025-05-15T12:29:46.558731",
                                        "updated_at": "2025-05-22T09:27:45.213255"
                                    },
                                    {
                                        "id": 6257,
                                        "company_id": 47,
                                        "report_date": "2021-03-31",
                                        "parameter": "Tax",
                                        "value": 1645.81,
                                        "created_at": "2025-05-15T12:29:46.558731",
                                        "updated_at": "2025-05-22T09:27:45.213255"
                                    },
                                    {
                                        "id": 6247,
                                        "company_id": 47,
                                        "report_date": "2021-03-31",
                                        "parameter": "Change in Inventory",
                                        "value": -135.59,
                                        "created_at": "2025-05-15T12:29:46.558731",
                                        "updated_at": "2025-05-22T09:27:45.213255"
                                    },
                                    {
                                        "id": 19963,
                                        "company_id": 141,
                                        "report_date": "2021-03-31",
                                        "parameter": "Employee Cost %",
                                        "value": 11,
                                        "created_at": "2025-05-15T12:29:46.558731",
                                        "updated_at": "2025-05-22T09:27:45.213255"
                                    },
                                    {
                                        "id": 19987,
                                        "company_id": 141,
                                        "report_date": "2021-03-31",
                                        "parameter": "Exceptional items",
                                        "value": -1158,
                                        "created_at": "2025-05-15T12:29:46.558731",
                                        "updated_at": "2025-05-22T09:27:45.213255"
                                    },
                                    {
                                        "id": 20071,
                                        "company_id": 141,
                                        "report_date": "2021-03-31",
                                        "parameter": "Exceptional items AT",
                                        "value": -419,
                                        "created_at": "2025-05-15T12:29:46.558731",
                                        "updated_at": "2025-05-22T09:27:45.213255"
                                    },
                                    {
                                        "id": 19951,
                                        "company_id": 141,
                                        "report_date": "2021-03-31",
                                        "parameter": "Manufacturing Cost %",
                                        "value": 4,
                                        "created_at": "2025-05-15T12:29:46.558731",
                                        "updated_at": "2025-05-22T09:27:45.213255"
                                    },
                                    {
                                        "id": 19939,
                                        "company_id": 141,
                                        "report_date": "2021-03-31",
                                        "parameter": "Material Cost %",
                                        "value": 52,
                                        "created_at": "2025-05-15T12:29:46.558731",
                                        "updated_at": "2025-05-22T09:27:45.213255"
                                    },
                                    {
                                        "id": 20047,
                                        "company_id": 141,
                                        "report_date": "2021-03-31",
                                        "parameter": "Minority share",
                                        "value": 300,
                                        "created_at": "2025-05-15T12:29:46.558731",
                                        "updated_at": "2025-05-22T09:27:45.213255"
                                    },
                                    {
                                        "id": 19975,
                                        "company_id": 141,
                                        "report_date": "2021-03-31",
                                        "parameter": "Other Cost %",
                                        "value": 18,
                                        "created_at": "2025-05-15T12:29:46.558731",
                                        "updated_at": "2025-05-22T09:27:45.213255"
                                    },
                                    {
                                        "id": 19999,
                                        "company_id": 141,
                                        "report_date": "2021-03-31",
                                        "parameter": "Other income normal",
                                        "value": 2310,
                                        "created_at": "2025-05-15T12:29:46.558731",
                                        "updated_at": "2025-05-22T09:27:45.213255"
                                    },
                                    {
                                        "id": 20011,
                                        "company_id": 141,
                                        "report_date": "2021-03-31",
                                        "parameter": "Profit after tax",
                                        "value": 1512,
                                        "created_at": "2025-05-15T12:29:46.558731",
                                        "updated_at": "2025-05-22T09:27:45.213255"
                                    },
                                    {
                                        "id": 20059,
                                        "company_id": 141,
                                        "report_date": "2021-03-31",
                                        "parameter": "Profit for EPS",
                                        "value": 1812,
                                        "created_at": "2025-05-15T12:29:46.558731",
                                        "updated_at": "2025-05-22T09:27:45.213255"
                                    },
                                    {
                                        "id": 20083,
                                        "company_id": 141,
                                        "report_date": "2021-03-31",
                                        "parameter": "Profit for PE",
                                        "value": 1932,
                                        "created_at": "2025-05-15T12:29:46.558731",
                                        "updated_at": "2025-05-22T09:27:45.213255"
                                    },
                                    {
                                        "id": 20023,
                                        "company_id": 141,
                                        "report_date": "2021-03-31",
                                        "parameter": "Profit from Associates",
                                        "value": 0,
                                        "created_at": "2025-05-15T12:29:46.558731",
                                        "updated_at": "2025-05-22T09:27:45.213255"
                                    },
                                    {
                                        "id": 20035,
                                        "company_id": 141,
                                        "report_date": "2021-03-31",
                                        "parameter": "Reported Net Profit",
                                        "value": 1512,
                                        "created_at": "2025-05-15T12:29:46.558731",
                                        "updated_at": "2025-05-22T09:27:45.213255"
                                    },
                                    {
                                        "id": 6272,
                                        "company_id": 47,
                                        "report_date": "2022-03-31",
                                        "parameter": "Tax",
                                        "value": 2108.76,
                                        "created_at": "2025-05-15T12:29:46.558731",
                                        "updated_at": "2025-05-22T09:27:45.213255"
                                    },
                                    {
                                        "id": 19964,
                                        "company_id": 141,
                                        "report_date": "2022-03-31",
                                        "parameter": "Employee Cost %",
                                        "value": 9,
                                        "created_at": "2025-05-15T12:29:46.558731",
                                        "updated_at": "2025-05-22T09:27:45.213255"
                                    },
                                    {
                                        "id": 19988,
                                        "company_id": 141,
                                        "report_date": "2022-03-31",
                                        "parameter": "Exceptional items",
                                        "value": 414,
                                        "created_at": "2025-05-15T12:29:46.558731",
                                        "updated_at": "2025-05-22T09:27:45.213255"
                                    },
                                    {
                                        "id": 20072,
                                        "company_id": 141,
                                        "report_date": "2022-03-31",
                                        "parameter": "Exceptional items AT",
                                        "value": 321,
                                        "created_at": "2025-05-15T12:29:46.558731",
                                        "updated_at": "2025-05-22T09:27:45.213255"
                                    },
                                    {
                                        "id": 19952,
                                        "company_id": 141,
                                        "report_date": "2022-03-31",
                                        "parameter": "Manufacturing Cost %",
                                        "value": 4,
                                        "created_at": "2025-05-15T12:29:46.558731",
                                        "updated_at": "2025-05-22T09:27:45.213255"
                                    },
                                    {
                                        "id": 19940,
                                        "company_id": 141,
                                        "report_date": "2022-03-31",
                                        "parameter": "Material Cost %",
                                        "value": 57,
                                        "created_at": "2025-05-15T12:29:46.558731",
                                        "updated_at": "2025-05-22T09:27:45.213255"
                                    },
                                    {
                                        "id": 20048,
                                        "company_id": 141,
                                        "report_date": "2022-03-31",
                                        "parameter": "Minority share",
                                        "value": -676,
                                        "created_at": "2025-05-15T12:29:46.558731",
                                        "updated_at": "2025-05-22T09:27:45.213255"
                                    },
                                    {
                                        "id": 19976,
                                        "company_id": 141,
                                        "report_date": "2022-03-31",
                                        "parameter": "Other Cost %",
                                        "value": 13,
                                        "created_at": "2025-05-15T12:29:46.558731",
                                        "updated_at": "2025-05-22T09:27:45.213255"
                                    },
                                    {
                                        "id": 20000,
                                        "company_id": 141,
                                        "report_date": "2022-03-31",
                                        "parameter": "Other income normal",
                                        "value": 2790,
                                        "created_at": "2025-05-15T12:29:46.558731",
                                        "updated_at": "2025-05-22T09:27:45.213255"
                                    },
                                    {
                                        "id": 20012,
                                        "company_id": 141,
                                        "report_date": "2022-03-31",
                                        "parameter": "Profit after tax",
                                        "value": 7253,
                                        "created_at": "2025-05-15T12:29:46.558731",
                                        "updated_at": "2025-05-22T09:27:45.213255"
                                    },
                                    {
                                        "id": 20060,
                                        "company_id": 141,
                                        "report_date": "2022-03-31",
                                        "parameter": "Profit for EPS",
                                        "value": 6577,
                                        "created_at": "2025-05-15T12:29:46.558731",
                                        "updated_at": "2025-05-22T09:27:45.213255"
                                    },
                                    {
                                        "id": 20084,
                                        "company_id": 141,
                                        "report_date": "2022-03-31",
                                        "parameter": "Profit for PE",
                                        "value": 6286,
                                        "created_at": "2025-05-15T12:29:46.558731",
                                        "updated_at": "2025-05-22T09:27:45.213255"
                                    },
                                    {
                                        "id": 20024,
                                        "company_id": 141,
                                        "report_date": "2022-03-31",
                                        "parameter": "Profit from Associates",
                                        "value": 0,
                                        "created_at": "2025-05-15T12:29:46.558731",
                                        "updated_at": "2025-05-22T09:27:45.213255"
                                    },
                                    {
                                        "id": 20036,
                                        "company_id": 141,
                                        "report_date": "2022-03-31",
                                        "parameter": "Reported Net Profit",
                                        "value": 7253,
                                        "created_at": "2025-05-15T12:29:46.558731",
                                        "updated_at": "2025-05-22T09:27:45.213255"
                                    },
                                    {
                                        "id": 19928,
                                        "company_id": 141,
                                        "report_date": "2022-03-31",
                                        "parameter": "Sales Growth %",
                                        "value": 21.4,
                                        "created_at": "2025-05-15T12:29:46.558731",
                                        "updated_at": "2025-05-22T09:27:45.213255"
                                    },
                                    {
                                        "id": 6269,
                                        "company_id": 47,
                                        "report_date": "2022-03-31",
                                        "parameter": "Depreciation",
                                        "value": 3507.5,
                                        "created_at": "2025-05-15T12:29:46.558731",
                                        "updated_at": "2025-05-22T09:27:45.213255"
                                    },
                                    {
                                        "id": 6274,
                                        "company_id": 47,
                                        "report_date": "2022-03-31",
                                        "parameter": "Dividend Amount",
                                        "value": 1284.5,
                                        "created_at": "2025-05-15T12:29:46.558731",
                                        "updated_at": "2025-05-22T09:27:45.213255"
                                    },
                                    {
                                        "id": 6265,
                                        "company_id": 47,
                                        "report_date": "2022-03-31",
                                        "parameter": "Employee Cost",
                                        "value": 8386.74,
                                        "created_at": "2025-05-15T12:29:46.558731",
                                        "updated_at": "2025-05-22T09:27:45.213255"
                                    },
                                    {
                                        "id": 6270,
                                        "company_id": 47,
                                        "report_date": "2022-03-31",
                                        "parameter": "Interest",
                                        "value": 5018.05,
                                        "created_at": "2025-05-15T12:29:46.558731",
                                        "updated_at": "2025-05-22T09:27:45.213255"
                                    },
                                    {
                                        "id": 6273,
                                        "company_id": 47,
                                        "report_date": "2022-03-31",
                                        "parameter": "Net profit",
                                        "value": 6577.32,
                                        "created_at": "2025-05-15T12:29:46.558731",
                                        "updated_at": "2025-05-22T09:27:45.213255"
                                    },
                                    {
                                        "id": 6267,
                                        "company_id": 47,
                                        "report_date": "2022-03-31",
                                        "parameter": "Other Expenses",
                                        "value": 5654.58,
                                        "created_at": "2025-05-15T12:29:46.558731",
                                        "updated_at": "2025-05-22T09:27:45.213255"
                                    },
                                    {
                                        "id": 6268,
                                        "company_id": 47,
                                        "report_date": "2022-03-31",
                                        "parameter": "Other Income",
                                        "value": 3204.47,
                                        "created_at": "2025-05-15T12:29:46.558731",
                                        "updated_at": "2025-05-22T09:27:45.213255"
                                    },
                                    {
                                        "id": 6264,
                                        "company_id": 47,
                                        "report_date": "2022-03-31",
                                        "parameter": "Other Mfr. Exp",
                                        "value": 3124.27,
                                        "created_at": "2025-05-15T12:29:46.558731",
                                        "updated_at": "2025-05-22T09:27:45.213255"
                                    },
                                    {
                                        "id": 6263,
                                        "company_id": 47,
                                        "report_date": "2022-03-31",
                                        "parameter": "Power and Fuel",
                                        "value": 541.27,
                                        "created_at": "2025-05-15T12:29:46.558731",
                                        "updated_at": "2025-05-22T09:27:45.213255"
                                    },
                                    {
                                        "id": 6271,
                                        "company_id": 47,
                                        "report_date": "2022-03-31",
                                        "parameter": "Profit before tax",
                                        "value": 9361.77,
                                        "created_at": "2025-05-15T12:29:46.558731",
                                        "updated_at": "2025-05-22T09:27:45.213255"
                                    },
                                    {
                                        "id": 6261,
                                        "company_id": 47,
                                        "report_date": "2022-03-31",
                                        "parameter": "Raw Material Cost",
                                        "value": 52664.85,
                                        "created_at": "2025-05-15T12:29:46.558731",
                                        "updated_at": "2025-05-22T09:27:45.213255"
                                    },
                                    {
                                        "id": 6260,
                                        "company_id": 47,
                                        "report_date": "2022-03-31",
                                        "parameter": "Sales",
                                        "value": 90170.57,
                                        "created_at": "2025-05-15T12:29:46.558731",
                                        "updated_at": "2025-05-22T09:27:45.213255"
                                    },
                                    {
                                        "id": 6266,
                                        "company_id": 47,
                                        "report_date": "2022-03-31",
                                        "parameter": "Selling and admin",
                                        "value": 5977.67,
                                        "created_at": "2025-05-15T12:29:46.558731",
                                        "updated_at": "2025-05-22T09:27:45.213255"
                                    },
                                    {
                                        "id": 6262,
                                        "company_id": 47,
                                        "report_date": "2022-03-31",
                                        "parameter": "Change in Inventory",
                                        "value": 861.66,
                                        "created_at": "2025-05-15T12:29:46.558731",
                                        "updated_at": "2025-05-22T09:27:45.213255"
                                    },
                                    {
                                        "id": 19929,
                                        "company_id": 141,
                                        "report_date": "2023-03-31",
                                        "parameter": "Sales Growth %",
                                        "value": 34.49,
                                        "created_at": "2025-05-15T12:29:46.558731",
                                        "updated_at": "2025-05-22T09:27:45.213255"
                                    },
                                    {
                                        "id": 6277,
                                        "company_id": 47,
                                        "report_date": "2023-03-31",
                                        "parameter": "Change in Inventory",
                                        "value": 2032.31,
                                        "created_at": "2025-05-15T12:29:46.558731",
                                        "updated_at": "2025-05-22T09:27:45.213255"
                                    },
                                    {
                                        "id": 6284,
                                        "company_id": 47,
                                        "report_date": "2023-03-31",
                                        "parameter": "Depreciation",
                                        "value": 4356.81,
                                        "created_at": "2025-05-15T12:29:46.558731",
                                        "updated_at": "2025-05-22T09:27:45.213255"
                                    },
                                    {
                                        "id": 6289,
                                        "company_id": 47,
                                        "report_date": "2023-03-31",
                                        "parameter": "Dividend Amount",
                                        "value": 1809.66,
                                        "created_at": "2025-05-15T12:29:46.558731",
                                        "updated_at": "2025-05-22T09:27:45.213255"
                                    },
                                    {
                                        "id": 6280,
                                        "company_id": 47,
                                        "report_date": "2023-03-31",
                                        "parameter": "Employee Cost",
                                        "value": 9677.95,
                                        "created_at": "2025-05-15T12:29:46.558731",
                                        "updated_at": "2025-05-22T09:27:45.213255"
                                    },
                                    {
                                        "id": 6285,
                                        "company_id": 47,
                                        "report_date": "2023-03-31",
                                        "parameter": "Interest",
                                        "value": 5829.7,
                                        "created_at": "2025-05-15T12:29:46.558731",
                                        "updated_at": "2025-05-22T09:27:45.213255"
                                    },
                                    {
                                        "id": 6288,
                                        "company_id": 47,
                                        "report_date": "2023-03-31",
                                        "parameter": "Net profit",
                                        "value": 10281.5,
                                        "created_at": "2025-05-15T12:29:46.558731",
                                        "updated_at": "2025-05-22T09:27:45.213255"
                                    },
                                    {
                                        "id": 6282,
                                        "company_id": 47,
                                        "report_date": "2023-03-31",
                                        "parameter": "Other Expenses",
                                        "value": 4966.98,
                                        "created_at": "2025-05-15T12:29:46.558731",
                                        "updated_at": "2025-05-22T09:27:45.213255"
                                    },
                                    {
                                        "id": 6283,
                                        "company_id": 47,
                                        "report_date": "2023-03-31",
                                        "parameter": "Other Income",
                                        "value": 3961.45,
                                        "created_at": "2025-05-15T12:29:46.558731",
                                        "updated_at": "2025-05-22T09:27:45.213255"
                                    },
                                    {
                                        "id": 6279,
                                        "company_id": 47,
                                        "report_date": "2023-03-31",
                                        "parameter": "Other Mfr. Exp",
                                        "value": 3838.42,
                                        "created_at": "2025-05-15T12:29:46.558731",
                                        "updated_at": "2025-05-22T09:27:45.213255"
                                    },
                                    {
                                        "id": 6278,
                                        "company_id": 47,
                                        "report_date": "2023-03-31",
                                        "parameter": "Power and Fuel",
                                        "value": 830.48,
                                        "created_at": "2025-05-15T12:29:46.558731",
                                        "updated_at": "2025-05-22T09:27:45.213255"
                                    },
                                    {
                                        "id": 6286,
                                        "company_id": 47,
                                        "report_date": "2023-03-31",
                                        "parameter": "Profit before tax",
                                        "value": 14060.23,
                                        "created_at": "2025-05-15T12:29:46.558731",
                                        "updated_at": "2025-05-22T09:27:45.213255"
                                    },
                                    {
                                        "id": 6276,
                                        "company_id": 47,
                                        "report_date": "2023-03-31",
                                        "parameter": "Raw Material Cost",
                                        "value": 76019.87,
                                        "created_at": "2025-05-15T12:29:46.558731",
                                        "updated_at": "2025-05-22T09:27:45.213255"
                                    },
                                    {
                                        "id": 6275,
                                        "company_id": 47,
                                        "report_date": "2023-03-31",
                                        "parameter": "Sales",
                                        "value": 121268.55,
                                        "created_at": "2025-05-15T12:29:46.558731",
                                        "updated_at": "2025-05-22T09:27:45.213255"
                                    },
                                    {
                                        "id": 6281,
                                        "company_id": 47,
                                        "report_date": "2023-03-31",
                                        "parameter": "Selling and admin",
                                        "value": 7681.87,
                                        "created_at": "2025-05-15T12:29:46.558731",
                                        "updated_at": "2025-05-22T09:27:45.213255"
                                    },
                                    {
                                        "id": 6287,
                                        "company_id": 47,
                                        "report_date": "2023-03-31",
                                        "parameter": "Tax",
                                        "value": 2685.75,
                                        "created_at": "2025-05-15T12:29:46.558731",
                                        "updated_at": "2025-05-22T09:27:45.213255"
                                    },
                                    {
                                        "id": 19965,
                                        "company_id": 141,
                                        "report_date": "2023-03-31",
                                        "parameter": "Employee Cost %",
                                        "value": 8,
                                        "created_at": "2025-05-15T12:29:46.558731",
                                        "updated_at": "2025-05-22T09:27:45.213255"
                                    },
                                    {
                                        "id": 19989,
                                        "company_id": 141,
                                        "report_date": "2023-03-31",
                                        "parameter": "Exceptional items",
                                        "value": 1250,
                                        "created_at": "2025-05-15T12:29:46.558731",
                                        "updated_at": "2025-05-22T09:27:45.213255"
                                    },
                                    {
                                        "id": 20073,
                                        "company_id": 141,
                                        "report_date": "2023-03-31",
                                        "parameter": "Exceptional items AT",
                                        "value": 1006,
                                        "created_at": "2025-05-15T12:29:46.558731",
                                        "updated_at": "2025-05-22T09:27:45.213255"
                                    },
                                    {
                                        "id": 19953,
                                        "company_id": 141,
                                        "report_date": "2023-03-31",
                                        "parameter": "Manufacturing Cost %",
                                        "value": 4,
                                        "created_at": "2025-05-15T12:29:46.558731",
                                        "updated_at": "2025-05-22T09:27:45.213255"
                                    },
                                    {
                                        "id": 19941,
                                        "company_id": 141,
                                        "report_date": "2023-03-31",
                                        "parameter": "Material Cost %",
                                        "value": 61,
                                        "created_at": "2025-05-15T12:29:46.558731",
                                        "updated_at": "2025-05-22T09:27:45.213255"
                                    },
                                    {
                                        "id": 20049,
                                        "company_id": 141,
                                        "report_date": "2023-03-31",
                                        "parameter": "Minority share",
                                        "value": -1093,
                                        "created_at": "2025-05-15T12:29:46.558731",
                                        "updated_at": "2025-05-22T09:27:45.213255"
                                    },
                                    {
                                        "id": 19977,
                                        "company_id": 141,
                                        "report_date": "2023-03-31",
                                        "parameter": "Other Cost %",
                                        "value": 10,
                                        "created_at": "2025-05-15T12:29:46.558731",
                                        "updated_at": "2025-05-22T09:27:45.213255"
                                    },
                                    {
                                        "id": 20001,
                                        "company_id": 141,
                                        "report_date": "2023-03-31",
                                        "parameter": "Other income normal",
                                        "value": 2712,
                                        "created_at": "2025-05-15T12:29:46.558731",
                                        "updated_at": "2025-05-22T09:27:45.213255"
                                    },
                                    {
                                        "id": 20013,
                                        "company_id": 141,
                                        "report_date": "2023-03-31",
                                        "parameter": "Profit after tax",
                                        "value": 11374,
                                        "created_at": "2025-05-15T12:29:46.558731",
                                        "updated_at": "2025-05-22T09:27:45.213255"
                                    },
                                    {
                                        "id": 20061,
                                        "company_id": 141,
                                        "report_date": "2023-03-31",
                                        "parameter": "Profit for EPS",
                                        "value": 10282,
                                        "created_at": "2025-05-15T12:29:46.558731",
                                        "updated_at": "2025-05-22T09:27:45.213255"
                                    },
                                    {
                                        "id": 20085,
                                        "company_id": 141,
                                        "report_date": "2023-03-31",
                                        "parameter": "Profit for PE",
                                        "value": 9372,
                                        "created_at": "2025-05-15T12:29:46.558731",
                                        "updated_at": "2025-05-22T09:27:45.213255"
                                    },
                                    {
                                        "id": 20025,
                                        "company_id": 141,
                                        "report_date": "2023-03-31",
                                        "parameter": "Profit from Associates",
                                        "value": 0,
                                        "created_at": "2025-05-15T12:29:46.558731",
                                        "updated_at": "2025-05-22T09:27:45.213255"
                                    },
                                    {
                                        "id": 20037,
                                        "company_id": 141,
                                        "report_date": "2023-03-31",
                                        "parameter": "Reported Net Profit",
                                        "value": 11374,
                                        "created_at": "2025-05-15T12:29:46.558731",
                                        "updated_at": "2025-05-22T09:27:45.213255"
                                    }
                                ]
                            }
                        ],
                        "colab_data": {
                            "companies": [
                                "INFY",
                                "M&M"
                            ],
                            "context": "\nCOMPANY: Infosys Limited (INFY)\nREPORTING_DATE: N/A\nSECTION: Unknown\nCONTENT: Open, MSG properties, Dow Jones, Financial Times). The Infosys Knowledge Institute (IKI) is positioned as the business research arm providing thought leadership and insights on technology's business impact through publications and client collaborations. The overall tone is forward-looking and emphasizes the company's capabilities, partnerships, and strategic direction to drive value for clients and stay ahead in the market. The text provides detailed information relevant to investors, primarily focusing on share capital structure and employee stock option plans. It lists major shareholders holding over 5% of shares as of March 31, 2022 and 2021, including Deutsche Bank Trust Company Americas (Depository of ADRs) and Life Insurance Corporation of India, along with their respective share counts and percentage holdings. A reconciliation of the number of shares outstanding and the amount of share capital is provided, showing changes from March 31, 2021 to March 31, 2022, including shares issued on exercise of employee stock options and shares bought back. The document details the 2015 Stock Incentive Compensation Plan and the 2019 Infosys Expanded Stock Ownership Program, outlining the maximum number of shares authorized, accounting policies for recognizing compensation expense, vesting periods (typically 4 years for RSUs and stock options, 1-3 years for performance-based RSUs), and performance parameters The management narrative highlights key strategic initiatives focusing on innovation, branding, and knowledge leadership. The Infosys Center for Emerging Technology Solutions (iCETS) is presented as the incubation partner for emerging technology solutions, leveraging 'New Emerging and eXploratory Technologies’ (NEXT) across dimensions like IncubateNext (rapid innovation, Living Labs), InspireNext (discovering new business possibilities, LPaaS, CoEs), ServiceNext (leveraging IP for differentiated offerings), and ConnectNext (external ecosystem collaboration, Infosys Innovation Network). The company emphasizes its brand value as a key intangible asset, positioned as a next-generation digital-first, cloud-first, and AI-first partner, built on four decades of experience navigating global enterprises. Marketing efforts leverage global digital campaigns and strategic partnerships (e.g., Australian Open, MSG properties, Dow Jones, Financial Times). The Infosys Knowledge Institute (IKI) is\n\n---\n\nCOMPANY: Mahindra & Mahindra Limited (M&M)\nREPORTING_DATE: N/A\nSECTION: Unknown\nCONTENT: This section presents standalone financial statements for Mahindra & Mahindra Ltd. as at and for the period ended 31st March, 2024, compared to the previous year (2023). Key financial figures relevant to investors include the Balance Sheet and the start of the Statement of Profit and Loss. This section, part of the Management Discussion and Analysis, serves as management's narrative on the company's performance for FY 2023-24. It provides context and explanation for changes in key financial ratios and expenditure components. Management highlights successful cost management initiatives leading to a reduction in total expenditure as a percentage of income and decreases in material costs and finance costs, primarily due to benign commodity prices, management initiatives, and repayment of borrowings. The narrative also touches upon strategic directions within group companies, such as Tech Mahindra's multi-year transformation for leadership, Club Mahindra's expansion and innovation focus, and Mahindra Lifespaces' focused growth strategy emphasizing sustainable urban developments. The tone is explanatory, providing reasons behind financial movements. Key messages include the improvement in financial health indicators like the Interest Coverage Ratio and Debt Equity Ratio due The text provides detailed financial highlights and business updates for several Kotak Mahindra subsidiaries, key information for investors evaluating performance. For **Kotak Mahindra Pension Fund Limited (KMPFL)**, Total Income was ₹3.39 crore (FY22) vs ₹3.81 crore (FY21), PBT was (₹1.54) crore (FY22 loss) vs ₹0.45 crore (FY21 profit), PAT was (₹1.54) crore (FY22 loss) vs ₹0.21 crore (FY21 profit). AUM grew by 42% to ₹2,230 crore (FY22) from ₹1,572 crore (FY21), outperforming the industry growth of 27%. KMPFL funds were top-performing in Government debt and among top two in Equity (NPS Tier 1) for FY22 and other periods. Regulatory changes included PFRDA approving shareholding transfer and a new AUM-based investment management fee structure effective June 1, 2021. The FY22 loss was attributed to increased costs offsetting higher fee income from the new structure.\n\n---",
                            "financial_keywords": [],
                            "ner_entities": [
                                "infy",
                                "m&m"
                            ],
                            "search_metadata": {
                                "documents_after_filtering": 13,
                                "documents_retrieved": 13,
                                "original_query": "INFY vs M&M",
                                "search_strategy": "targeted_company_searches"
                            },
                            "structured_data": {
                                "companies_data": [
                                    {
                                        "company_name": "Infosys Limited",
                                        "content": "Open, MSG properties, Dow Jones, Financial Times). The Infosys Knowledge Institute (IKI) is positioned as the business research arm providing thought leadership and insights on technology's business impact through publications and client collaborations. The overall tone is forward-looking and emphasizes the company's capabilities, partnerships, and strategic direction to drive value for clients and stay ahead in the market. The text provides detailed information relevant to investors, primarily focusing on share capital structure and employee stock option plans. It lists major shareholders holding over 5% of shares as of March 31, 2022 and 2021, including Deutsche Bank Trust Company Americas (Depository of ADRs) and Life Insurance Corporation of India, along with their respective share counts and percentage holdings. A reconciliation of the number of shares outstanding and the amount of share capital is provided, showing changes from March 31, 2021 to March 31, 2022, including shares issued on exercise of employee stock options and shares bought back. The document details the 2015 Stock Incentive Compensation Plan and the 2019 Infosys Expanded Stock Ownership Program, outlining the maximum number of shares authorized, accounting policies for recognizing compensation expense, vesting periods (typically 4 years for RSUs and stock options, 1-3 years for performance-based RSUs), and performance parameters The management narrative highlights key strategic initiatives focusing on innovation, branding, and knowledge leadership. The Infosys Center for Emerging Technology Solutions (iCETS) is presented as the incubation partner for emerging technology solutions, leveraging 'New Emerging and eXploratory Technologies’ (NEXT) across dimensions like IncubateNext (rapid innovation, Living Labs), InspireNext (discovering new business possibilities, LPaaS, CoEs), ServiceNext (leveraging IP for differentiated offerings), and ConnectNext (external ecosystem collaboration, Infosys Innovation Network). The company emphasizes its brand value as a key intangible asset, positioned as a next-generation digital-first, cloud-first, and AI-first partner, built on four decades of experience navigating global enterprises. Marketing efforts leverage global digital campaigns and strategic partnerships (e.g., Australian Open, MSG properties, Dow Jones, Financial Times). The Infosys Knowledge Institute (IKI) is",
                                        "reporting_date": "N/A",
                                        "section": "Unknown",
                                        "ticker": "INFY"
                                    },
                                    {
                                        "company_name": "Mahindra & Mahindra Limited",
                                        "content": "This section presents standalone financial statements for Mahindra & Mahindra Ltd. as at and for the period ended 31st March, 2024, compared to the previous year (2023). Key financial figures relevant to investors include the Balance Sheet and the start of the Statement of Profit and Loss. This section, part of the Management Discussion and Analysis, serves as management's narrative on the company's performance for FY 2023-24. It provides context and explanation for changes in key financial ratios and expenditure components. Management highlights successful cost management initiatives leading to a reduction in total expenditure as a percentage of income and decreases in material costs and finance costs, primarily due to benign commodity prices, management initiatives, and repayment of borrowings. The narrative also touches upon strategic directions within group companies, such as Tech Mahindra's multi-year transformation for leadership, Club Mahindra's expansion and innovation focus, and Mahindra Lifespaces' focused growth strategy emphasizing sustainable urban developments. The tone is explanatory, providing reasons behind financial movements. Key messages include the improvement in financial health indicators like the Interest Coverage Ratio and Debt Equity Ratio due The text provides detailed financial highlights and business updates for several Kotak Mahindra subsidiaries, key information for investors evaluating performance. For **Kotak Mahindra Pension Fund Limited (KMPFL)**, Total Income was ₹3.39 crore (FY22) vs ₹3.81 crore (FY21), PBT was (₹1.54) crore (FY22 loss) vs ₹0.45 crore (FY21 profit), PAT was (₹1.54) crore (FY22 loss) vs ₹0.21 crore (FY21 profit). AUM grew by 42% to ₹2,230 crore (FY22) from ₹1,572 crore (FY21), outperforming the industry growth of 27%. KMPFL funds were top-performing in Government debt and among top two in Equity (NPS Tier 1) for FY22 and other periods. Regulatory changes included PFRDA approving shareholding transfer and a new AUM-based investment management fee structure effective June 1, 2021. The FY22 loss was attributed to increased costs offsetting higher fee income from the new structure.",
                                        "reporting_date": "N/A",
                                        "section": "Unknown",
                                        "ticker": "M&M"
                                    }
                                ],
                                "summary": {
                                    "companies_list": [
                                        "INFY",
                                        "M&M"
                                    ],
                                    "total_companies": 2
                                }
                            },
                            "total_documents": 13
                        },
                        "context_info": {
                            "ner_entities": [
                                "infy",
                                "m&m"
                            ],
                            "num_chunks": 0,
                            "context_length": 4768
                        }
                    },
                    timestamp: "2023-10-01T12:00:00Z"
                },
            ]
        }
    },
    currentLLMResponse: {}
}

export const reducer = (state = initState, { type, payload }) => {
    switch (type) {
        case LOADING:
            return {
                ...state,
                isLoading: true,
                isError: false
            };
        case ERROR:
            return {
                ...state,
                isLoading: false,
                isError: true
            };
        case CREATE_CHAT_HISTORY:
            const chatId = state.chatHistory.length + 1;
            state.chatHistory.push(chatId);
            state.chatHistoryMap[chatId] = {
                title: payload.title,
                history: payload.historyData
            }
            return {
                ...state,
                isLoading: false,
                isError: false,
            };
        case SET_CHAT_HISTORY:
            state.chatHistoryMap[payload.chatId].history.push(payload.historyData);
            return {
                ...state,
                isLoading: false,
                isError: false
            };
        case REMOVE_CHAT_HISTORY:
            console.log("Working")
            return {
                ...state,
                isLoading: false,
                isError: false,
                chatHistory: state.chatHistory.filter(chatId => chatId !== payload.chatId),
                chatHistoryMap: Object.keys(state.chatHistoryMap)
                    .filter(chatId => chatId !== payload.chatId)
                    .reduce((acc, chatId) => {
                        acc[chatId] = state.chatHistoryMap[chatId];
                        return acc;
                    }, {})
            };
        case SET_CURRENT_LLM_RESPONSE:
            return {
                ...state,
                isLoading: false,
                isError: false,
                currentLLMResponse: {
                    ...state.currentLLMResponse,
                    [payload.chatId]: payload.response
                }
            };
        default:
            return state;
    }
}