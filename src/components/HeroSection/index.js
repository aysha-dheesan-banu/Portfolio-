import React, { useState, useEffect } from 'react';
import HeroBgAnimation from '../HeroBgAnimation';
import { HeroContainer, HeroBg, HeroLeftContainer, Img, HeroRightContainer, HeroInnerContainer, TextLoop, Title, Span, SubTitle,SocialMediaIcons,SocialMediaIcon, ResumeButton } from './HeroStyle';
import Typewriter from 'typewriter-effect';
import { loadMarkdownFile } from '../../utils/contentLoader';

const HeroSection = () => {
    const [bio, setBio] = useState(null);
    const [resume, setResume] = useState(null);

    useEffect(() => {
        const fetchContent = async () => {
            const aboutContent = await loadMarkdownFile('/content/about/index.md');
            setBio(aboutContent.frontmatter);

            const resumeContent = await loadMarkdownFile('/content/resume/index.md');
            setResume(resumeContent.frontmatter);
        };
        fetchContent();
    }, []);

    if (!bio || !resume) {
        return <div>Loading...</div>;
    }

    return (
        <div id="about">
            <HeroContainer>
                <HeroBg>
                    <HeroBgAnimation />
                </HeroBg>
                <HeroInnerContainer >
                    <HeroLeftContainer id="Left">
                        <Title>Hi, I am <br /> {bio.name}</Title>
                        <TextLoop>
                            I am a
                            <Span>
                                <Typewriter
                                    options={{
                                        strings: bio.roles,
                                        autoStart: true,
                                        loop: true,
                                    }}
                                />
                            </Span>
                        </TextLoop>
                        <SubTitle>{bio.description}</SubTitle>
                        <ResumeButton href={resume.resume_file} target='display'>{resume.button_text}</ResumeButton>
                    </HeroLeftContainer>

                    <HeroRightContainer id="Right">
<Img src={"/Hero Image.jpg.jpeg"} alt="hero-image" />
                    </HeroRightContainer>
                </HeroInnerContainer>
            </HeroContainer>
        </div>
    );
};

export default HeroSection
