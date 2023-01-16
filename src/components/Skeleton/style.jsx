import styled from "styled-components";

export const SkeletonStyle = styled.span`
    background: #eee;
    background: linear-gradient(110deg, #ececec 8%, #f5f5f5 18%, #ececec 33%);
    border-radius: 5px;
    background-size: 200% 100%;
    animation: 1.5s shine linear infinite;
    width: 100%;
    display: block;
    // transform: scale(0.925);
    // transform-origin: left;
    &.rectangle {

    }
    &.circle {
      border-radius: 100%;
    }
    @keyframes shine {
        to {
          background-position-x: -200%;
        }
    }
      

`