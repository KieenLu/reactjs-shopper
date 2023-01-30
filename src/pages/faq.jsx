import { Accordion } from "@/components/Accordion";
import { useScrollTop } from "@/hooks/useScrollTop";
import React from "react";
import { Helmet } from "react-helmet";

const FaqPage = () => {
  useScrollTop();
  return (
    <div>
      <Helmet>
        <title>Giả đáp</title>
      </Helmet>
      {/* BREADCRUMB */}
      <nav className="py-5">
        <div className="container">
          <div className="row">
            <div className="col-12">
              {/* Breadcrumb */}
              <ol className="breadcrumb mb-0 font-size-xs text-gray-400">
                <li className="breadcrumb-item">
                  <a className="text-gray-400" href="index.html">
                    Home
                  </a>
                </li>
                <li className="breadcrumb-item active">FAQ</li>
              </ol>
            </div>
          </div>
        </div>
      </nav>
      {/* CONTENT */}
      <section className="pt-7 pb-12">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 col-lg-10 col-xl-8">
              {/* Heading */}
              <h3 className="mb-10 text-center">Frequently Asked Questionss</h3>
              {/* Heading */}
              <h5 className="mb-7">Orders:</h5>
              {/* List group */}
              <ul
                className="list-group list-group-flush-x mb-9"
                id="faqCollapseParentOne"
              >
                <Accordion.Group>
                  <Accordion title="1. Bring of had which their whose you're it own ?">
                    Saw wherein fruitful good days image them, midst, waters
                    upon, saw. Seas lights seasons. Fourth hath rule creepeth
                    own lesser years itself so seed fifth for grass.
                  </Accordion>
                  <Accordion title=" 2. Over shall air can't subdue fly divide him ?">
                    Saw wherein fruitful good days image them, midst, waters
                    upon, saw. Seas lights seasons. Fourth hath rule creepeth
                    own lesser years itself so seed fifth for grass.
                  </Accordion>
                  <Accordion title=" 3. Waters one you'll creeping ?">
                    Saw wherein fruitful good days image them, midst, waters
                    upon, saw. Seas lights seasons. Fourth hath rule creepeth
                    own lesser years itself so seed fifth for grass.
                  </Accordion>
                  <Accordion title="4. Fowl, given morning seed fruitful kind beast be ?">
                    Saw wherein fruitful good days image them, midst, waters
                    upon, saw. Seas lights seasons. Fourth hath rule creepeth
                    own lesser years itself so seed fifth for grass.
                  </Accordion>
                </Accordion.Group>
              </ul>
              {/* Heading */}
              <h5 className="mb-7">Shipping &amp; Returns:</h5>
              {/* List group */}
              <ul
                className="list-group list-group-flush-x mb-9"
                id="faqCollapseParentTwo"
              >
                <Accordion.Group>
                  <Accordion title="1. Bring of had which their whose you're it own ?">
                    Saw wherein fruitful good days image them, midst, waters
                    upon, saw. Seas lights seasons. Fourth hath rule creepeth
                    own lesser years itself so seed fifth for grass.
                  </Accordion>
                  <Accordion title=" 2. Over shall air can't subdue fly divide him ?">
                    Saw wherein fruitful good days image them, midst, waters
                    upon, saw. Seas lights seasons. Fourth hath rule creepeth
                    own lesser years itself so seed fifth for grass.
                  </Accordion>
                  <Accordion title=" 3. Waters one you'll creeping ?">
                    Saw wherein fruitful good days image them, midst, waters
                    upon, saw. Seas lights seasons. Fourth hath rule creepeth
                    own lesser years itself so seed fifth for grass.
                  </Accordion>
                  <Accordion title="4. Fowl, given morning seed fruitful kind beast be ?">
                    Saw wherein fruitful good days image them, midst, waters
                    upon, saw. Seas lights seasons. Fourth hath rule creepeth
                    own lesser years itself so seed fifth for grass.
                  </Accordion>
                </Accordion.Group>
              </ul>
              {/* Heading */}
              <h5 className="mb-7">Payment:</h5>
              {/* List group */}
              <ul
                className="list-group list-group-flush-x"
                id="faqCollapseParentThree"
              >
                <Accordion.Group>
                  <Accordion title="1. Above beginning won't over?">
                    Saw wherein fruitful good days image them, midst, waters
                    upon, saw. Seas lights seasons. Fourth hath rule creepeth
                    own lesser years itself so seed fifth for grass.
                  </Accordion>
                  <Accordion title="2. Good gathering image called, fifth good?">
                    Saw wherein fruitful good days image them, midst, waters
                    upon, saw. Seas lights seasons. Fourth hath rule creepeth
                    own lesser years itself so seed fifth for grass.
                  </Accordion>
                  <Accordion title="3. Fly beast days dominion firmament?">
                    Saw wherein fruitful good days image them, midst, waters
                    upon, saw. Seas lights seasons. Fourth hath rule creepeth
                    own lesser years itself so seed fifth for grass.
                  </Accordion>
                  <Accordion title="4. Fowl, given morning seed fruitful kind beast be?">
                    Saw wherein fruitful good days image them, midst, waters
                    upon, saw. Seas lights seasons. Fourth hath rule creepeth
                    own lesser years itself so seed fifth for grass.
                  </Accordion>
                </Accordion.Group>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FaqPage;
