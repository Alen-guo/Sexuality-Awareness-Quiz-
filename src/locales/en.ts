const en = {
    home: {
        title: "Explore Your Sexual Orientation for Free",
        desc: "Our professional test helps you better understand your sexual orientation and expression. Just 3 minutes for an in-depth personal analysis report.",
        start: "Start Test",
        intro: "The SQS Sexual Orientation Awareness Test is a self-assessment tool developed based on psychological and sociological theories, designed to help users scientifically and rationally explore their emotional attraction, relationship patterns, and identity. The test covers diverse sexual orientation types, incorporates international mainstream research, and uses structured questionnaires and intelligent algorithms to provide personalized result interpretation and life advice. We respect every orientation, advocate for inclusion and understanding, and emphasize the fluidity and diversity of sexual orientation. The results are for self-awareness only, not for medical or legal diagnosis. If you have doubts or need support, please seek professional psychological counseling or LGBTQ+ organizations. Let's use science and warmth to know our true selves and embrace a diverse world.",
        features: [
            {
                title: "Professional Analysis",
                desc: "Based on psychological and sexual orientation research, we provide a professional analysis report."
            },
            {
                title: "Privacy Protection",
                desc: "We strictly protect your privacy. All test data is encrypted."
            },
            {
                title: "Continuous Support",
                desc: "We offer follow-up consulting services to help you better understand and accept yourself."
            }
        ]
    },
    test: {
        title: "Sexual Orientation Awareness Test",
        next: "Next Section",
        submit: "View Results",
        agree: "Agree",
        disagree: "Disagree",
        progress: ["Attraction Spectrum", "Relationship Patterns", "Identity Cognition"],
        required: "Please complete all questions on this page before continuing.",
        options: ["Strongly Disagree", "Disagree", "Not Sure", "Agree", "Strongly Agree"],
        questions: [
            // Part 1: Attraction Spectrum
            { id: 1, group: 'Attraction Spectrum', type: 'heterosexual', text: 'The scent of the opposite sex (hair, body, hormones) makes my heart race', note: 'Maps to Kinsey scale measurement of heterosexual attraction' },
            { id: 2, group: 'Attraction Spectrum', type: 'homosexual', text: 'Same-sex smiles make me feel more comfortable and warm than opposite-sex ones', note: 'References sexual orientation theory for same-sex attraction' },
            { id: 3, group: 'Attraction Spectrum', type: 'pansexual', text: 'I feel attracted to strangers focused on tasks, regardless of gender, even wanting to photograph them', note: 'Reflects pansexual gender-neutral attraction' },
            { id: 4, group: 'Attraction Spectrum', type: 'skoliosexual', text: 'Neutral voices reading poetry stir my emotions and romantic fantasies more than "magnetic male voices" or "mature female voices"', note: 'Incorporates transgender voice attraction research' },
            { id: 5, group: 'Attraction Spectrum', type: 'asexual', text: 'I have never fantasized about physical intimacy with anyone, regardless of gender', note: 'Corresponds to core asexual criteria' },
            { id: 6, group: 'Attraction Spectrum', type: 'objectum', text: 'The matte texture of old books fascinates me more than human skin contact', note: 'Metaphorical expression of objectum sexuality' },
            { id: 7, group: 'Attraction Spectrum', type: 'skoliosexual', text: 'I can\'t help but notice transgender people\'s unique fashion styles (male-to-female, female-to-male cosplayers)', note: 'Tests openness to gender expression' },
            { id: 8, group: 'Attraction Spectrum', type: 'graysexual', text: 'Gender-ambiguous late-night radio host voices often trigger my fantasies', note: 'Maps to non-binary voice attraction' },
            { id: 9, group: 'Attraction Spectrum', type: 'graysexual', text: 'I have felt curiosity or attraction to people whose physical characteristics don\'t fit traditional categories, like long-haired beautiful men or short-haired cool women', note: 'Points to intersex acceptance assessment' },
            { id: 10, group: 'Attraction Spectrum', type: 'bisexual', text: 'Vulnerable moments of a specific gender (like holding back tears) particularly move me', note: 'Involves gender preference analysis in emotional projection' },

            // Part 2: Relationship Patterns
            { id: 11, group: 'Relationship Patterns', type: 'skoliosexual', text: 'I look forward to cooking with a transgender partner in the kitchen or dancing under dim candlelight', note: 'Maps to transgender intimate relationship scenarios' },
            { id: 12, group: 'Relationship Patterns', type: 'skoliosexual', text: 'I can accept partners whose biological sex differs from their gender identity, like gentle men or strong women', note: 'Tests transgender relationship inclusivity' },
            { id: 13, group: 'Relationship Patterns', type: 'sapiosexual', text: 'Intellectually logical conversations bring more satisfaction than physical contact', note: 'Embodies core sapiosexual characteristics' },
            { id: 14, group: 'Relationship Patterns', type: 'pansexual', text: 'I prefer exchanging DIY rings under the aurora borealis over traditional diamond rings', note: 'Reflects attitude toward institutional relationships' },
            { id: 15, group: 'Relationship Patterns', type: 'graysexual', text: 'I reject all intimate relationships requiring "clear gender roles"', note: 'Evaluates non-binary relationship tendencies' },
            { id: 16, group: 'Relationship Patterns', type: 'pansexual', text: 'When traveling as a couple, I care more about the destination than my companion\'s gender', note: 'Tests pansexual emotional priority' },
            { id: 17, group: 'Relationship Patterns', type: 'pansexual', text: 'I look forward to receiving handwritten love letters from unknown genders, focusing more on content than gender', note: 'Maps to gender-neutral romantic needs' },
            { id: 18, group: 'Relationship Patterns', type: 'bisexual', text: 'I can understand open relationships, such as dating my partner\'s partner', note: 'Involves polyamory ethics cognition' },
            { id: 19, group: 'Relationship Patterns', type: 'heterosexual', text: 'I need to know the gender of anyone I date in advance', note: 'Reflects gender certainty needs' },
            { id: 20, group: 'Relationship Patterns', type: 'sapiosexual', text: 'I believe the essence of love is soul compatibility rather than physical matching', note: 'Echoes core queer theory propositions' },

            // Part 3: Social Identity Cognition
            { id: 21, group: 'Social Identity Cognition', type: 'homosexual', text: 'I actively use "they" pronouns for non-traditional heterosexuals', note: 'Tests language inclusivity practice' },
            { id: 22, group: 'Social Identity Cognition', type: 'skoliosexual', text: 'I respect others using gender reassignment surgery to achieve self-identity', note: 'Assesses transgender medical cognition' },
            { id: 23, group: 'Social Identity Cognition', type: 'skoliosexual', text: 'Wearing gender-neutral clothing brings strong gender euphoria, with a sense of novelty and excitement', note: 'References transgender euphoria concept' },
            { id: 24, group: 'Social Identity Cognition', type: 'pansexual', text: 'I look forward to a future society without gender classification labels', note: 'Tests gender deconstruction attitudes' },
            { id: 25, group: 'Social Identity Cognition', type: 'pansexual', text: 'I believe "love should transcend biological gender"', note: 'Measures social equality values' },
            { id: 26, group: 'Social Identity Cognition', type: 'graysexual', text: 'I have experienced long-term self-doubt due to sexual orientation issues', note: 'Maps to sexual minority cognitive dilemmas' },
            { id: 27, group: 'Social Identity Cognition', type: 'asexual', text: 'I cannot accept the notion that asexuality is a psychological disorder', note: 'Opposes sexual orientation pathologization' },
            { id: 28, group: 'Social Identity Cognition', type: 'homosexual', text: 'I am willing to participate in rainbow-themed public welfare activities', note: 'Tests community belonging' },
            { id: 29, group: 'Social Identity Cognition', type: 'objectum', text: 'I believe sexual orientation can change over time, potentially being "bent" one day', note: 'Echoes Kinsey\'s fluid sexual orientation theory' },
            { id: 30, group: 'Social Identity Cognition', type: 'sapiosexual', text: 'I look forward to establishing a more refined sexual orientation classification system, beyond just homosexual, heterosexual, and bisexual', note: 'Points to academic research frontiers' }
        ],
        typeMap: ['heterosexual', 'homosexual', 'bisexual', 'pansexual', 'asexual', 'graysexual', 'skoliosexual', 'objectum', 'sapiosexual'],
        typeLabels: {
            heterosexual: 'heterosexual',
            homosexual: 'homosexual',
            bisexual: 'bisexual',
            pansexual: 'pansexual',
            asexual: 'asexual',
            graysexual: 'graysexual',
            skoliosexual: 'skoliosexual',
            objectum: 'objectum',
            sapiosexual: 'sapiosexual'
        }
    },
    results: {
        title: "Your Test Result",
        warning: "This result is for reference only. Sexual orientation is a fluid and diverse self-identity and cannot be simply defined. For professional support, please contact a counselor or LGBTQ+ organization. (If you feel offended, please ignore, just for fun. Wish you a happy life!)",
        radarTitle: "Sexual Orientation Radar Chart",
        radarNote: "This chart is based on your real answers and reflects your multi-dimensional orientation tendencies.",
        typeDef: "Type Definition",
        story: "Famous People / Stories",
        features: "Main Features",
        advice: "Life Advice",
        colorCard: "Orientation Color Cards",
        yourType: "← Your Type",
        storyLine: "Parallel World Storylines",
        story1: "Suppressed Identity Trajectory",
        story2: "Coming Out Social Cost Calculator",
        story3: "Orientation Fluidity Sandbox",
        dashboard: "Survival Probability Dashboard",
        dashboardNote: "(For reference only, calculated by anti-discrimination law index and LGBTQ+ crime rate)",
        resource: "Resource Neural Network",
        retest: "Retake Test",
        save: "Save Result",
        storyHighlight: {
            heterosexual: "[True Story] Your heterosexual friends may also be struggling with self-identity and social expectations. Everyone's growth deserves understanding.",
            homosexual: "[The Story of Alan Turing] Alan Turing, a British mathematician and computer science pioneer, was persecuted for his homosexuality and died young. His story inspires countless LGBTQ+ people to pursue their true selves.",
            bisexual: "[The Story of Freddie Mercury] Queen's lead singer Freddie Mercury openly identified as bisexual and broke boundaries with his music.",
            pansexual: "[The Story of Miley Cyrus] American pop star Miley Cyrus publicly identifies as pansexual and advocates for LGBTQ+ inclusion and equality.",
            asexual: "[The Story of David Jay] David Jay, founder of AVEN, promotes asexual visibility and social understanding.",
            graysexual: "[Graysexual Voices] 'I don't always feel attraction, but when I meet someone special, it's precious.' — Shared by a Chinese graysexual community member.",
            skoliosexual: "[The Story of Laverne Cox] American transgender actress Laverne Cox speaks out for the trans community and promotes social inclusion.",
            objectum: "[The Story of Erika Eiffel] Erika Eiffel is known for 'marrying' the Eiffel Tower and calls for understanding of objectum sexuality.",
            sapiosexual: "[Sapiosexual Voices] 'I'm attracted to sparks of thought, and conversations with interesting souls make me happy.' — Shared by the sapiosexual community on Zhihu."
        },
        storyLines: {
            suppressed: {
                heterosexual: { story: ["You choose to conform to the mainstream, hiding part of your true self.", "You may gain superficial stability, but there is always an unfulfilled longing inside.", "You constantly weigh self-identity and social expectations."], risk: "Long-term suppression can affect happiness and mental health.", opportunity: "You will better understand others' struggles and develop empathy.", suggestion: "Talk to trusted friends and gradually explore ways to express yourself." },
                homosexual: { story: ["You choose to hide your true self and try to fit into mainstream society. You may marry the opposite sex and play traditional roles, but there is always an unfillable void inside.", "In intimate relationships, you often feel lonely and disconnected, unable to build true emotional bonds.", "You may question your self-worth late at night, even falling into depression or anxiety."], risk: "Long-term suppression may lead to mental health issues and even affect physical health.", opportunity: "You develop strong self-protection and empathy, becoming more sensitive to others' difficulties.", suggestion: "Seek LGBTQ+-friendly counseling and gradually explore safe ways to express your identity." }
            },
            comingout: {
                heterosexual: { story: ["You choose to express your true self at the right time.", "You will experience some social pressure but also gain understanding and support.", "You gradually build confidence and a sense of belonging."], risk: "You may face misunderstanding and short-term pressure.", opportunity: "You can build more authentic relationships and grow personally.", suggestion: "Take it step by step and share with people you trust." },
                homosexual: { story: ["You decide to come out to family and friends, possibly facing misunderstanding or rejection at first.", "At work and in public, you must weigh the risks of coming out.", "Over time, you may meet more like-minded friends and gain community support."], risk: "You may face family tension, workplace discrimination, and other real pressures.", opportunity: "You have the chance to build authentic relationships and gain the freedom of self-acceptance.", suggestion: "Assess your environment, choose a safe time to come out, and seek help from LGBTQ+ organizations." }
            },
            fluidity: {
                heterosexual: { story: ["You experience the diversity and fluidity of sexual orientation and gradually understand yourself.", "You discover more possibilities and make friends from different backgrounds.", "You learn to appreciate every unique emotional experience."], risk: "Fluidity may bring temporary confusion and unease.", opportunity: "You gain richer life experiences and personal growth.", suggestion: "Stay open-minded and be brave in exploring and expressing yourself." },
                homosexual: { story: ["You find that your emotional and sexual attraction changes subtly over time and in different environments.", "You may develop feelings for people of different genders and gradually understand the fluidity of orientation.", "You learn to accept yourself and no longer limit your identity with labels."], risk: "Periods of identity fluidity may bring self-doubt and external questioning.", opportunity: "You experience richer relationships and personal growth.", suggestion: "Record your changes, stay open-minded, and be brave in exploring." }
            }
        },
        resourceMap: {
            heterosexual: { concept: "Heteronormativity Theory", paper: "Heteronormativity and Social Structure", org: "Chinese Psychological Society Gender Psychology Committee" },
            homosexual: { concept: "Minority Stress Model", paper: "Mental Health and Social Support of Homosexuals", org: "Tongzhi Public Welfare" },
            bisexual: { concept: "Monique Wittig Theory", paper: "Bisexual Mental Health White Paper", org: "Beijing LGBT Center" },
            pansexual: { concept: "Gender Fluidity Theory", paper: "Gender Diversity and Social Inclusion", org: "Rainbow Home" },
            graysexual: { concept: "Attraction Spectrum", paper: "Psychological Study of Graysexual Groups", org: "Asexuality China" },
            asexual: { concept: "Sexual Orientation Diversity Theory", paper: "Asexual Mental Health Guide", org: "Asexuality China" },
            skoliosexual: { concept: "Queer Gender Theory", paper: "Transgender Psychology and Social Support", org: "Trans Home" },
            objectum: { concept: "Objectum Psychology", paper: "Psychological Mechanisms of Objectum Sexuality", org: "Chinese Psychological Society Gender Psychology Committee" },
            sapiosexual: { concept: "Intellectual Attraction Theory", paper: "Sapiosexuality and Intimate Relationships", org: "Rainbow Home" }
        },
        resourceLabels: {
            concept: "Psychological Concept",
            paper: "Academic Paper",
            org: "Support Organization"
        },
        storyLineLabels: {
            suppressed: "Suppressed",
            comingout: "Coming Out",
            fluidity: "Fluidity",
            risk: "Risk",
            opportunity: "Opportunity",
            suggestion: "Suggestion"
        },
        characteristics: {
            heterosexual: [
                "1. Traditional Gender Role Identity: Heterosexual individuals typically identify with traditional gender role divisions and tend to follow mainstream gender norms in intimate relationships.",
                "2. High Social Acceptance: As the mainstream orientation, heterosexual individuals enjoy higher acceptance and inclusion in society, facing less discrimination related to sexual orientation.",
                "3. Relatively Less Family Pressure: Heterosexual individuals face relatively less social and family pressure in terms of family formation and childbearing.",
                "4. Emotional Expression: Heterosexual individuals' emotional expression often aligns with mainstream social expectations, making it easier to receive social support in intimate relationships.",
                "5. Self-Identity Process: The sexual orientation identification process for heterosexual individuals is usually more natural, with less identity-related distress.",
                "6. Social Resource Access: Heterosexual individuals face fewer restrictions in accessing social resources and employment opportunities due to their orientation.",
                "7. Mental Health Status: Due to less pressure related to sexual orientation, heterosexual individuals generally have better mental health.",
                "8. Intimate Relationship Patterns: Heterosexual individuals' relationship patterns often align with mainstream social expectations, making it easier to gain family and social recognition.",
                "9. Social Support Network: Heterosexual individuals find it easier to establish social support networks that align with mainstream expectations.",
                "10. Life Planning: In terms of career development and family planning, heterosexual individuals' choices often align with mainstream social expectations."
            ],
            homosexual: [
                "1. Authentic Self-Identity: Homosexual individuals often need to go through a process of awakening and acceptance of self-identity during their growth.",
                "2. Subtle and Profound Emotional Expression: Due to social environment influences, homosexual individuals often express emotions more carefully and subtly.",
                "3. Social Adaptation and Stress Resistance: Facing external prejudice and discrimination, homosexual individuals typically develop strong social adaptation and stress resistance abilities.",
                "4. Multicultural Inclusivity: In the process of self-identity, homosexual individuals often encounter diverse gender and sexual orientation concepts.",
                "5. Creativity and Self-Expression: Many homosexual individuals show high creativity in art, literature, and design fields.",
                "6. Community Belonging and Mutual Support: In seeking self-identity, homosexual individuals often actively join LGBTQ+ communities.",
                "7. Sensitivity to Social Justice: Having experienced injustice, homosexual individuals are usually more concerned about social equity and human rights issues.",
                "8. Loyalty and Stability in Relationships: Research shows that many homosexual partners show high loyalty and stability after establishing relationships.",
                "9. Self-Growth and Reflection: In the process of exploring self-identity, homosexual individuals experience significant self-reflection and growth.",
                "10. Lifestyle Diversity: Homosexual individuals show high diversity in lifestyle, interests, and social circles."
            ],
            // ... other types' characteristics
        },
        recommendations: {
            heterosexual: [
                "1. Maintain an Open Mind: While being the mainstream orientation, maintain inclusiveness and understanding of diverse orientations.",
                "2. Engage in Multicultural Activities: Actively learn about and understand different orientation groups' cultures and needs.",
                "3. Support Equal Rights: Actively participate in and support LGBTQ+ equal rights movements.",
                "4. Develop Empathy: Try to understand the challenges and pressures faced by different orientation groups.",
                "5. Educate the Next Generation: Help the next generation establish correct understanding of diverse orientations.",
                "6. Focus on Mental Health: Maintain good mental health and seek professional help when needed.",
                "7. Build Support Network: Establish support networks with like-minded friends.",
                "8. Continuous Learning: Stay updated with the latest research and developments in sexual orientation.",
                "9. Participate in Public Welfare: Help those in need through public welfare activities.",
                "10. Maintain Self-Growth: Keep learning and improving, maintaining an open and inclusive mindset."
            ],
            homosexual: [
                "1. Accept Yourself, Acknowledge Inner Needs: Learn to accept your true self regardless of external evaluation.",
                "2. Find Support System: Actively connect with like-minded friends and join LGBTQ+ communities or support organizations.",
                "3. Focus on Mental Health: Seek professional psychological counseling if experiencing long-term anxiety, depression, or loneliness.",
                "4. Learn Self-Protection: Be cautious about expressing your orientation in unsafe environments.",
                "5. Improve Communication Skills: Honest communication is key to maintaining relationships.",
                "6. Participate in Public Welfare: Help others and enhance self-worth through LGBTQ+ projects and volunteer work.",
                "7. Continuous Learning: Stay updated with the latest research and social dynamics in gender and orientation.",
                "8. Plan for the Future: Make rational choices in career and family planning based on your situation.",
                "9. Develop Hobbies: Rich hobbies help relieve stress and enhance life happiness.",
                "10. Focus on Legal Rights: Understand local and international LGBTQ+ laws and policies, actively protect your rights."
            ],
            // ... other types' recommendations
        },
        locationDesc: "Safety index for coming out in {region}{city}: {score}/100",
        fetchingLocation: "Fetching location...",
        close: "Close",
        viewTypeIntro: "View {type} introduction",
        scoreUnit: "/100",
        scoreDefault: "--",
        typeDesc: {
            heterosexual: "Emotional or sexual attraction to the opposite sex; the most common orientation.",
            homosexual: "Emotional or sexual attraction to the same sex, including gay men and lesbians.",
            bisexual: "Attraction to both men and women.",
            pansexual: "Attraction not based on gender, encompassing diverse groups.",
            graysexual: "Weak or unstable sexual attraction.",
            asexual: "Lack of sexual desire, but may have romantic needs.",
            skoliosexual: "Attraction to transgender or non-binary individuals.",
            objectum: "Attraction to inanimate objects.",
            sapiosexual: "Attraction primarily to intelligence."
        }
    },
    nav: {
        home: "Home",
        test: "Test",
        types: "Orientation Types",
        profile: "Profile"
    },
    footer: {
        about: {
            title: "About Us",
            desc: "We are dedicated to providing professional sexual orientation testing services to help people better understand themselves."
        },
        contact: {
            title: "Contact",
            email: "Email: 446675781@qq.com"
        },
        social: {
            title: "Follow Us",
            wechat: "WeChat",
            weibo: "Weibo"
        },
        copyright: "© 2025 Sexual Orientation Test. All rights reserved."
    },
    types: {
        mainGroup: "Main Orientations",
        diverseGroup: "Diverse Orientations",
        specialGroup: "Special Orientations",
        detail: {
            definition: "Type Definition",
            challenges: "Current Status/Challenges",
            misunderstandings: "Common Misconceptions",
            recommendations: "Life Recommendations"
        }
    },
    global: {
        logoTitle: "SQS Sexual Orientation Test"
    }
};
export default en; 