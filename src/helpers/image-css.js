export default `
.Image {
  height: 100%;
  width: 100%;
}

.Image-img {
  display: block;
  height: auto;
  max-width: 100%;
}

.Image--cover {
  background-repeat: no-repeat;
  background-size: cover;
  display: block;
  overflow: hidden;
}

.Image--cover .Image-img {
  height: 100%;
  visibility: hidden;
  width: 100%;
}

.Image--anchorN {
  background-position: 50% 0;
}

.Image--anchorNE {
  background-position: 100% 0;
}

.Image--anchorE {
  background-position: 100% 50%;
}

.Image--anchorSE {
  background-position: 100% 100%;
}

.Image--anchorS {
  background-position: 50% 100%;
}

.Image--anchorSW {
  background-position: 0 100%;
}

.Image--anchorW {
  background-position: 0 50%;
}

.Image--anchorNW {
  background-position: 0 0;
}

.Image--anchorC {
  background-position: 50% 50%;
}

.Image--overlay {
  position: relative;
}

.Image--overlay:after {
  bottom: 0;
  content: "";
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
}

.Image--dark:after {
  background: black;
  opacity: 0.4;
}

@supports ((-o-object-fit: cover) or (object-fit: cover)) and
  ((-o-object-position: 50% 50%) or (object-position: 50% 50%)) {
  .Image--cover {
    background-image: none !important; /* 1 */
  }

  .Image--cover .Image-img {
    -o-object-fit: cover;
    object-fit: cover; /* 1 */
    visibility: visible;
  }

  .Image--anchorN .Image-img {
    -o-object-position: 50% 0;
    object-position: 50% 0;
  }

  .Image--anchorNE .Image-img {
    -o-object-position: 100% 0;
    object-position: 100% 0;
  }

  .Image--anchorE .Image-img {
    -o-object-position: 100% 50%;
    object-position: 100% 50%;
  }

  .Image--anchorSE .Image-img {
    -o-object-position: 100% 100%;
    object-position: 100% 100%;
  }

  .Image--anchorS .Image-img {
    -o-object-position: 50% 100%;
    object-position: 50% 100%;
  }

  .Image--anchorSW .Image-img {
    -o-object-position: 0 100%;
    object-position: 0 100%;
  }

  .Image--anchorW .Image-img {
    -o-object-position: 0 50%;
    object-position: 0 50%;
  }

  .Image--anchorNW .Image-img {
    -o-object-position: 0 0;
    object-position: 0 0;
  }

  .Image--anchorC .Image-img {
    -o-object-position: 50% 50%;
    object-position: 50% 50%;
  }
}
`;
